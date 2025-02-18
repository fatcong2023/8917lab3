module.exports = async function (context) {
    const url = context.bindings.input;
    try {
      const response = await fetch(url, { method: 'GET' });
      if (response.ok) {
        return `URL ${url} is healthy (Status: ${response.status})`;
      } else {
        return `URL ${url} returned status ${response.status}`;
      }
    } catch (error) {
      return `Error checking URL ${url}: ${error.message}`;
    }
  };
  