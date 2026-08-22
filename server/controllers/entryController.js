const EntryService = require('../services/EntryService');

class EntryController {
  list(req, res) {
    try {
      const { contract } = req.query;
      const entries = EntryService.listEntries(contract);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch entries' });
    }
  }

  create(req, res) {
    try {
      const result = EntryService.createEntry(req.body);

      if (!result.success) {
        return res.status(400).json({ errors: result.errors });
      }

      res.status(201).json(result.entry);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create entry' });
    }
  }

  summary(req, res) {
    try {
      const summary = EntryService.getSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch summary' });
    }
  }
}

module.exports = new EntryController();
