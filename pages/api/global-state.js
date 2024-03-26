// pages/api/global-state.js
export default (req, res) => {
    if (req.method === 'GET') {
      // Return the current global state
      res.json({ myValue: 'Default Value' });
    } else if (req.method === 'POST') {
      // Update the global state (you may want to use a database or another storage mechanism)
      // For simplicity, we are just echoing back the data in this example
      res.json(req.body);
    }
  };