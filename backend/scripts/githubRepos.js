import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDB from "../config/db.connection.js";
import Repo from "../models/repo.model.js";
import { delay, buildUrl, filterRepos } from "./utils.js";
import {
  LANGUAGES,
  STAR_BUCKETS,
  ALLOWED_LICENSE_KEYS,
  MAX_PAGES,
} from "../constants.js";

// Main function to fetch and store repos
async function fetchAndStore() {
  await connectDB();
  let totalStored = 0;

  for (const language of LANGUAGES) {
    for (const starBucket of STAR_BUCKETS) {
      for (const license of ALLOWED_LICENSE_KEYS) {
        for (let page = 1; page <= MAX_PAGES; page++) {
          const url = buildUrl(language, starBucket, page, license);

          try {
            const res = await fetch(url, {
              headers: {
                Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json"
              }
            });

            if (!res.ok) {
              const errData = await res.json().catch(() => ({}));
              throw { response: { status: res.status, data: errData }, message: res.statusText };
            }

            const data = await res.json();
            const rawRepos = data.items || [];
            const filtered = filterRepos(rawRepos);

            const insertPromises = filtered.map((repo) => ({
              updateOne: {
                filter: { id: repo.id },
                update: {
                  $setOnInsert: {
                    id: repo.id,
                    name: repo.name,
                    fullName: repo.full_name,
                    htmlUrl: repo.html_url,
                    description: repo.description?.slice(0, 300) || "",
                    language: repo.language || "Unknown",
                    starsCount: repo.stargazers_count,
                    forksCount: repo.forks_count,
                    watchersCount: repo.watchers_count,
                    openIssuesCount: repo.open_issues_count,
                    createdAt: repo.created_at,
                    pushedAt: repo.pushed_at,
                    topics: repo.topics || [],
                  }
                },
                upsert: true
              }
            }));

            if (insertPromises.length) {
              const result = await Repo.bulkWrite(insertPromises, { ordered: false });
              const inserted = result.upsertedCount || 0;
              totalStored += inserted;
              console.log(`Stored: ${inserted} (Total: ${totalStored})`);
            }

            await delay(2000); // Delay to avoid burst

          } catch (err) {
            const msg = err.response?.data?.message || err.message;
            console.error(`Error fetching ${url}: ${msg}`);

            if (err.response?.status === 403) {
              console.log("Rate limit hit. Waiting 60 seconds...");
              await delay(60000);
              page--; // Retry same page
            }
          }
        }
      }
    }
  }

  await mongoose.connection.close();
  console.log("Finished. Total repos stored:", totalStored);
}

fetchAndStore();