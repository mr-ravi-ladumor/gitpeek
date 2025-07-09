import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About GitPeek</h1>
        <p>Discover and explore open source repositories</p>
      </div>{" "}
      <div className="about-content">
        <section className="about-section">
          <h2>What is GitPeek?</h2>
          <p>
            GitPeek is a web application where you can discover and explore
            GitHub repositories. Instead of manually searching through thousands
            of repositories, GitPeek shows you over 12,000+ curated open source
            projects in one place.
          </p>
        </section>

        <section className="about-section">
          <h2>What can you do?</h2>
          <p>
            You can filter repositories by programming languages (JavaScript,
            Python, Java, etc.), minimum star count (from 200 to 500k+ stars),
            and specific topics like "web", "Frontedn", "react", "Backend" etc.
            Sort them by stars, forks, issues, or creation date. You can also
            bookmark repositories to save them for later viewing.
          </p>
        </section>

        <section className="about-section">
          <h2>How it works</h2>
          <p>
            GitPeek fetches data from GitHub's public API and stores information
            about active repositories in a database. The data automatically
            updates daily to keep repository statistics current. Each repository
            shows stars, forks, issues, language, and other useful information
            to help you decide if it's worth exploring.
          </p>
        </section>

        <div className="about-buttons">
          <a
            href="https://github.com/mr-ravi-ladumor/gitpeek"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
          >
            View Source Code
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
