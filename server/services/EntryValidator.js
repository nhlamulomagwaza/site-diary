class EntryValidator {
  validateCreate(payload) {
    const errors = [];
    const { date, contractName, weather, notes, authorName } = payload;

    if (!date || typeof date !== 'string') {
      errors.push({ field: 'date', message: 'Date is required' });
    } else {
      const parsed = new Date(date);
      if (Number.isNaN(parsed.getTime())) {
        errors.push({ field: 'date', message: 'Date must be a valid date' });
      } else {
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (parsed > today) {
          errors.push({ field: 'date', message: 'Date may not be in the future' });
        }
      }
    }

    if (!contractName || typeof contractName !== 'string' || !contractName.trim()) {
      errors.push({ field: 'contractName', message: 'Contract name is required' });
    }

    if (!weather || typeof weather !== 'string' || !weather.trim()) {
      errors.push({ field: 'weather', message: 'Weather is required' });
    }

    if (!notes || typeof notes !== 'string' || !notes.trim()) {
      errors.push({ field: 'notes', message: 'Notes are required' });
    } else if (notes.length > 500) {
      errors.push({ field: 'notes', message: 'Notes must not exceed 500 characters' });
    }

    if (!authorName || typeof authorName !== 'string' || !authorName.trim()) {
      errors.push({ field: 'authorName', message: 'Author name is required' });
    }

    return errors;
  }
}

module.exports = new EntryValidator();
