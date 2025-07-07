// Enhanced version of updateRepos.js
if (!process.env.MONGODB_URI || !process.env.TOKEN_GITHUB) {
  console.error("Missing env vars: MONGODB_URI or GITHUB_TOKEN");
  console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
  console.log("GITHUB_TOKEN exists:", !!process.env.TOKEN_GITHUB);
  process.exit(1);
}

import Repo from '../models/repo.model.js';
import connectDB from '../config/db.connection.js';
import mongoose from 'mongoose';

async function updateRepos() {
  try {
    console.log("Starting repo update process...");
    await connectDB();
    console.log("Database connected successfully.");
    
    const repos = await Repo.find({}, { fullName: 1, id: 1 });
    console.log(`Found ${repos.length} repos to update.`);

    let updated = 0;
    let failed = 0;

    for (const repo of repos) {
      try {
        const res = await fetch(`https://api.github.com/repos/${repo.fullName}`, {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN_GITHUB}`,
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

        updated++;
        if (updated % 100 === 0) {
          console.log(`Updated ${updated} repos so far...`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 1500));
      } catch (error) {
        failed++;
        const message = error.response?.data?.message || error.message;
        console.error(`Error updating repo ${repo.fullName}:`, message);
        
        if (error.response?.status === 403) {
          console.log('Rate limit exceeded. Waiting for 60 seconds...');
          await new Promise(resolve => setTimeout(resolve, 60000));
        }
      }
    }

    console.log(`Update complete! Updated: ${updated}, Failed: ${failed}`);
  } finally {
    await mongoose.connection.close();
  }
}

updateRepos()
  .then(() => console.log('Update process finished successfully.'))
  .catch(err => console.error('Error in update process:', err))
  .finally(() => process.exit(0));