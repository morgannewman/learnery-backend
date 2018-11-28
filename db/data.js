const cards = [
  { question: 'Are u nice', answer: 'no' },
  { question: 'Are u happy', answer: 'yes' },
  { question: 'Are u ambivalent', answer: 'maybe' },
  { question: 'Are u ?', answer: '?' },
  { question: 'Are u nice', answer: 'no' },
  { question: 'Are u happy', answer: 'yes' },
  { question: 'Are u ambivalent', answer: 'maybe' },
  { question: 'Are u ?', answer: '?' }
];

const users = [
  { username: 'potato1', email: 'email1@test.com', password: 'password', queue: constructQueue() },
  { username: 'tomato2', email: 'email2@test.com', password: 'password', queue: constructQueue() },
  { username: 'brosato3', email: 'email3@test.com', password: 'password', queue: constructQueue() }
];

function constructQueue() {
  const n = cards.length;
  const result = [];
	// IDs start at 1
  for (let i = 1; i <= n; i++) {
    result.push({
      id: i,
      M: 1
    });
  }
  return result;
}

module.exports = {
  cards,
  users,
  constructQueue
};
