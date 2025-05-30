import { useState } from 'react'
/**
 *  returns the index of the greatest value  in an array
 * if  the array contains 1 or more  values that equals the createst one,  the index of the first one is returned
 * @param {array} array the array 
 * @returns index of the greatest  value
 */
function indexOfGreatest(array) {
  let index = 0;
  let greatest = array[index];
  
  for (let i = 0; i < array.length; i++) {
    if (array[i] > greatest) {
      greatest = array[i];
      index = i;
    }
  }
  return index;
}

/**
 *  common button
 * @param {{className?: string, onClick: function, text: string }}  button props
 *   @param {string} props.className  custom styles
 *  @param {function} props.onClick  event handler
 * @param {string} props.text  button text
 * @returns    <button> element 
 */
 const Button = ({className, onClick, text}) => (<button className={className} onClick={onClick}>{text}</button>);

 /**
 *   returns a random integer between the specified values
 * source https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {number} min minimum value 
 * @param {*} max maximum value  
 * @returns a random int between min and max
 */
 function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
/**
 *    a component that makes it possible to vote the randomly generated anecdote 
 * @param {array} props.data the anecdotes 
 * @param {array} props.votes votes for each anecdote
 * @param {number} selected the index of the randojly  selected anecdote
 * @param {function} props.setVotes  function  that registers a new vote
 * @returns if the total amount of votes is 0, a <button> for voting is returned, otherwise the most voted anecdote as well  
 */
  const Voting = ({data, votes, selected, setVotes}) =>  {
    
    const handleVoted = (index) =>  {
      const newVotes = [...votes];
      newVotes[index]++;
      setVotes(newVotes);
    }

    const sumOfVotes = votes.reduce((sum, e)  => sum += e, 0);

    if (sumOfVotes == 0) {
      return (<><Button className='btn btn-block' onClick={() => handleVoted(selected)} text="Vote this anecdote"/></>);
    } 
    return (
      <>
      <Button className='btn btn-block' onClick={() => handleVoted(selected)} text="Vote this anecdote"/>
      <p className='text-success'>The most voted anecdote is: {data[indexOfGreatest(votes)]}</p>
      </>
    );

    
  }
const App = () => {
    const anecdotes = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      'The only way to go fast, is to go well.'
    ]
     
    const [selected, setSelected] = useState(getRandomInt(0, anecdotes.length));
    const  [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  
    const handleSelected = () => {
        let rand = getRandomInt(0, anecdotes.length);
        setSelected(rand);
    }
    
    
    return (
      <div className="container">
 <h1 className='text-primary'>Programming Anecdotes</h1>
 <p className='text-muted'>{anecdotes[selected]}</p>
 <Button className='btn btn-block' onClick={handleSelected} text="New anecdote"/>
<Voting data={anecdotes} votes={votes} selected={selected} setVotes={setVotes}/>
</div>
    )
  }
export default App
