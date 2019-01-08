const cards = [
  { question: 'What is a const?', answer: 'Only Gabe knows.' },
  {
    question: 'What is the difference between <script>, <script async> and <script defer>?',
    answer:
			'Normal scripts are blocking, so page render pauses until the script downloads and runs. Async scripts do not block rendering while downloading, but they do run as soon as they load. Defer scripts download and run after all HTML and CSS renders.'
  },
  {
    question: 'When should you use a button vs. a link?',
    answer:
			'Buttons should be used for interactions within a page, or interactions that don\'t always cause you to leave a page (e.g. form submission). Links should be used for interactions that will always leave the current page.'
  },
  {
    question: 'How can you vertically center an element without using Flexbox?',
    answer:
			'Absolute positioning, setting the line-height to equal the height of the parent, or using clever margins (though this requires knowing the absolute proportions of the element).'
  },
  {
    question: 'How can you design a stack with a max() method that has O(1) lookup time?',
    answer: 'Use a second stack to keep track of the maximum values at each point in time.'
  },
  {
    question: 'Is it possible to prevent a form submission from reloading the page without JavaScript?',
    answer:
			'Yes. Although you cannot prevent a form from reloading the page after it has been submitted w/o JavaScript, you can have the form be disabled by default and simply enable it with JavaScript.'
  },
  {
    question: 'What happens when you add a number to a string?',
    answer: 'The number is coerced to a string, then they are added together.'
  },
  {
    question: 'How do you succeed in life?',
    answer: 'Finish your deadlines the day before they are due. Underpromise and overdeliver.'
  }
];

const seedDataQueue = [
  {
    M: 2,
    id: 4,
    stats: {
      streak: 1,
      lastSeen: '2018-11-27T12:56:57.676Z',
      maxStreak: 1,
      timesSeen: 3,
      timesCorrect: 1,
      timesIncorrect: 2
    }
  },
  {
    M: 4,
    id: 2,
    stats: {
      streak: 1,
      lastSeen: '2018-11-28T15:56:57.676Z',
      maxStreak: 2,
      timesSeen: 4,
      timesCorrect: 3,
      timesIncorrect: 1
    }
  },
  {
    M: 2,
    id: 6,
    stats: {
      streak: 1,
      lastSeen: '2018-11-25T15:52:57.676Z',
      maxStreak: 1,
      timesSeen: 3,
      timesCorrect: 1,
      timesIncorrect: 2
    }
  },
  {
    M: 4,
    id: 8,
    stats: {
      streak: 2,
      lastSeen: '2018-11-25T16:56:57.676Z',
      maxStreak: 2,
      timesSeen: 4,
      timesCorrect: 2,
      timesIncorrect: 2
    }
  },
  {
    M: 8,
    id: 1,
    stats: {
      streak: 3,
      lastSeen: '2018-11-25T15:58:57.676Z',
      maxStreak: 3,
      timesSeen: 4,
      timesCorrect: 3,
      timesIncorrect: 1
    }
  },
  {
    M: 8,
    id: 3,
    stats: {
      streak: 3,
      lastSeen: '2018-11-25T13:55:57.676Z',
      maxStreak: 3,
      timesSeen: 3,
      timesCorrect: 3,
      timesIncorrect: 0
    }
  },
  {
    M: 16,
    id: 7,
    stats: {
      streak: 4,
      lastSeen: '2018-11-25T14:56:57.676Z',
      maxStreak: 4,
      timesSeen: 4,
      timesCorrect: 4,
      timesIncorrect: 0
    }
  },
  {
    M: 32,
    id: 5,
    stats: {
      streak: 5,
      lastSeen: '2018-11-25T14:58:57.676Z',
      maxStreak: 5,
      timesSeen: 5,
      timesCorrect: 5,
      timesIncorrect: 0
    }
  }
];

const users = [
  {
    username: 'potato1',
    email: 'email1@test.com',
    password: 'password',
    queue: seedDataQueue,
    stats: {
      streak: 0,
      maxStreak: 0,
      lastSeen: null,
      secondsSpentAnswering: 0,
      cardsAnswered: 0
    }
  },
  {
    username: 'tomato2',
    email: 'email2@test.com',
    password: 'password',
    queue: seedDataQueue,
    stats: {
      streak: 0,
      maxStreak: 0,
      lastSeen: null,
      secondsSpentAnswering: 0,
      cardsAnswered: 0
    }
  },
  {
    username: 'brosato3',
    email: 'email3@test.com',
    password: 'password',
    queue: seedDataQueue,
    stats: {
      streak: 4,
      maxStreak: 15,
      lastSeen: null,
      secondsSpentAnswering: 0,
      cardsAnswered: 96
    }
  }
];

function constructQueue() {
  const n = cards.length;
  const result = [];
	// IDs start at 1
  for (let i = 1; i <= n; i++) {
    result.push({
      id: i,
      M: 1,
      stats: {
        timesCorrect: 0,
        timesIncorrect: 0,
        streak: 0,
        maxStreak: 0,
        lastSeen: null,
        timesSeen: 0
      }
    });
  }
  return result;
}

module.exports = {
  cards,
  users,
  constructQueue
};
