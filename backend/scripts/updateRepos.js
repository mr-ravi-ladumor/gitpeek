import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import Repo from '../models/repo.model.js';
import connectDB from '../config/db.connection.js';

async function updateRepos() {
  await connectDB();
  const repos = await Repo.find({}, { fullName: 1, id: 1 });
  console.log('updating repos...', repos.length);

  for (const repo of repos) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo.fullName}`, {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json'
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw { response: { status: res.status, data: errorData } };
      }

      const data = await res.json();

      await Repo.updateOne(
        { id: repo.id },
        {
          $set: {
            starsCount: data.stargazers_count,
            forksCount: data.forks_count,
            openIssuesCount: data.open_issues_count,
            watchersCount: data.watchers_count,
            description: data.description,
            language: data.language,
            topics: data.topics,
            pushedAt: data.pushed_at,
          },
        }
      );

      console.log(`Updated repo ${repo.fullName} successfully.`);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      console.error(`Error updating repo ${repo.fullName}:`, message);
      if (error.response?.status === 403) {
        console.log('Rate limit exceeded. Waiting for 60 seconds...');
        await new Promise(resolve => setTimeout(resolve, 60000));
      }
    }
  }
}

updateRepos()
  .then(() => console.log('All repos updated successfully.'))
  .catch(err => console.error('Error updating repos:', err))
  .finally(() => process.exit(0));