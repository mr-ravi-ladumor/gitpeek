import Repo from '../models/repo.model.js';

export const handleRepos = async (req, res) => {
  try {
    const { stars, languages, topics, page = 1, sort, order } = req.query;
    const limit = 30;

    const query = {
      starsCount: stars ? { $gte: parseInt(stars) } : { $gte: 500 },
      ...(languages && { language: { $in: languages.split(',') } }),
      ...(topics && { topics: { $in: topics.split(',') } })
    };

    const skip = (Number(page) - 1) * Number(limit);

    let repos;
    if (sort && order) {
      const sortOrder = order === 'asc' ? 1 : -1;
      repos = await Repo.find(query)
        .skip(skip)
        .limit(Number(limit))
        .sort({ [sort]: sortOrder });
    } else {
      repos = await Repo.aggregate([
        { $match: query },
        { $sample: { size: Number(limit) } }
      ]);
    }

    const totalRepos = await Repo.countDocuments(query);
    res.json({
      repos,
      total_count: totalRepos,
    });

  } catch (error) {
    console.error('Error fetching repos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const handleRepoById = async (req, res) => {
  const repoId = req.params.id;
  try {
    const repo = await Repo.findOne({ id: repoId });
    if (!repo) {
      return res.status(404).json({ error: 'Repo not found' });
    }
    res.json({ repo });
  } catch (error) {
    console.error('Error fetching repo by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};