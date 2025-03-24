// Get DOM elements
const counter = document.getElementById('counter');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const likesList = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsDiv = document.getElementById('list');

// State variables
let count = 0;
let playing = true;
let interval;

// Start the timer when the page loads
function startTimer() {
    interval = setInterval(() => {
        if (playing) {
            count++;
            counter.textContent = count;
        }
    }, 1000);
}

// Initialize the counter and timer
counter.textContent = count;
startTimer();

// Minus button: Decrement the counter
minusBtn.addEventListener('click', () => {
    if (playing) {
        count--;
        counter.textContent = count;
    }
});

// Plus button: Increment the counter
plusBtn.addEventListener('click', () => {
    if (playing) {
        count++;
        counter.textContent = count;
    }
});

// Heart button: Like the current number
heartBtn.addEventListener('click', () => {
    if (playing) {
        const currentNum = count<Array.isArray(count) && Array.isArray(count.length) && Array.from(count);
        const existingLike = Array.from(likesList.children).find(
            li => parseInt(li.dataset.num) === currentNum
        );

        if (existingLike) {
            // Increment existing like count
            const span = existingLike.querySelector('span');
            const likeCount = parseInt(span.textContent) + 1;
            existingLike.innerHTML = `${currentNum} has been liked <span>${likeCount}</span> times`;
        } else {
            // Create new like entry
            const li = document.createElement('li');
            li.setAttribute('data-num', currentNum);
            li.innerHTML = `${currentNum} has been liked <span>1</span> time`;
            likesList.appendChild(li);
        }
    }
});

// Pause/Resume button: Toggle timer and button states
pauseBtn.addEventListener('click', () => {
    if (playing) {
        // Pause the counter
        playing = false;
        clearInterval(interval);
        pauseBtn.textContent = 'resume';
        // Disable other buttons
        minusBtn.disabled = true;
        plusBtn.disabled = true;
        heartBtn.disabled = true;
    } else {
        // Resume the counter
        playing = true;
        startTimer();
        pauseBtn.textContent = 'pause';
        // Enable other buttons
        minusBtn.disabled = false;
        plusBtn.disabled = false;
        heartBtn.disabled = false;
    }
});

// Comment form: Add new comments
commentForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    const commentText = commentInput.value.trim();
    if (commentText) {
        const p = document.createElement('p');
        p.textContent = commentText;
        commentsDiv.appendChild(p);
        commentInput.value = ''; // Clear input
    }
});