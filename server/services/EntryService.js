const EntryModel = require('../models/EntryModel');
const EntryValidator = require('./EntryValidator');

class EntryService {
  listEntries(contractName) {
    const filter = contractName?.trim() || undefined;
    return EntryModel.findAll(filter);
  }

  createEntry(payload) {
    const errors = EntryValidator.validateCreate(payload);
    if (errors.length > 0) {
      return { success: false, errors };
    }

    const entry = EntryModel.create({
      date: payload.date,
      contractName: payload.contractName.trim(),
      weather: payload.weather.trim(),
      notes: payload.notes.trim(),
      authorName: payload.authorName.trim(),
    });

    return { success: true, entry };
  }

  getSummary() {
    return EntryModel.getSummary();
  }
}

module.exports = new EntryService();
