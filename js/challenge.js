//I should see the count of the number of "likes" associated with that number displayed.
// Click the "restart" button to restart the counter and re-enable the buttons.

window.addEventListener('DOMContentLoaded', (e) => {
  const counter = document.getElementById('counter');
  const pauseButton = document.getElementById('pause');
  const minusButton = document.getElementById('minus');
  const plusButton = document.getElementById('plus'); 
  const heartButton = document.getElementById('heart');
  //console.log();

  function incrementNum(){
    const currentCount = counter.innerText;
    const newCount = parseInt(currentCount) + 1;
    counter.innerText = newCount;
    //console.log(newCount);
  };

//1
  let changeNum = setInterval(incrementNum, 1000);

  pauseButton.addEventListener('click', (e) => {
    if (pauseButton.id === 'pause'){
      clearInterval(changeNum);
      pauseButton.id = 'resume';
      pauseButton.innerText = 'resume';
      minusButton.disabled = true;
      plusButton.disabled = true;
      heartButton.disabled = true;
      document.getElementById('submit').disabled = true;
      const resumeButton = document.getElementById('resume');
      // console.log(resumeButton);
    } else {
      pauseButton.id = 'pause';
      pauseButton.innerText = 'pause';
      changeNum = setInterval(incrementNum, 1000);
      //originally I had this as setInterval(incrementNum, 1000) and it wouldn't work. That is becuase in the if statement we are clearInterval(changeNum). This will clear out the changeNum variable so we need to reassign it to the setInterval. Also it was a const variable and it needs to be let to allow changes. 
      minusButton.disabled = false;
      plusButton.disabled = false;
      heartButton.disabled = false;
      document.getElementById('submit').disabled = false;
    }
  }); 

  minusButton.addEventListener('click',(e) => {
    const currentCountNum = counter.innerText; 
    const newCount = parseInt(currentCountNum) - 1;
    counter.innerText = newCount
  });

  plusButton.addEventListener('click',(e) => {
    const currentCountNum = counter.innerText; 
    const newCount = parseInt(currentCountNum) + 1;
    counter.innerText = newCount
  });

  heartButton.addEventListener('click',
  (e) => {
    const currentCountNum = counter.innerText
    //refactor code with the variable idCurrentCountNum since used multiple times in heartButton code block
    //note - don't need ; 
    const idCurrentCountNum = document.getElementById(currentCountNum)

    if (idCurrentCountNum) {
    let newLike = parseInt(idCurrentCountNum.innerText.split(' ')[4]) + 1
    //we're getting the id (current number) innerText if the current liked number exists. that innerText is a string so we are splitting the string into words. Then we want to grab index 4 which is the number of liked time(s). Since this is a string we want to parseInt. Now its a number and then we increment it by adding 1. We assign this newLike number to the variable.
    let likeText = `${currentCountNum} has been liked ${newLike} times`
    //interpolate and add the newLike number change along with pluralizing the time. 
    document.getElementById(currentCountNum).innerText = likeText
    //no need to appendChild because we are just changing the innerText and not creating and adding a child
    //also use let since it will be reassigned as you like the same number multiple times
    } else {
    //if number has not been liked before then this code will run to create it
    //let likedCounter = 1; 
    //no longer need likedCounter and can get rid of in likeText
    let listLikeNum = document.createElement('li')
    listLikeNum.id = currentCountNum
    let likeText = `${currentCountNum} has been liked 1 time`
    listLikeNum.innerText = likeText
    //console.log(listLikeNum);
    document.querySelector('.likes').appendChild(listLikeNum)
    }
  });

  const commentForm = document.getElementById('comment-form');

  commentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const commentInput = document.getElementById('comment-input');
  buildCommentList(commentInput.value);
  commentForm.reset();
  });

  function buildCommentList(comment) {
    const listItem = document.createElement('li');
    listItem.innerText = comment;
    document.querySelector('#list').appendChild(listItem);
  };

});