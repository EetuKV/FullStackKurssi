import { useState } from 'react'
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
 *  component that shows statistics about the feedbacks 
 * @param {Array}  array with three integer values that  represent the amount of good, neutral and bad feedbacks 
 * @returns if no feedback has been given, <p>  informing that no feedback has been given, otherwise   a <table> containing <StatisticLine> components that render the statistical data 
 */
const Statistics = ({data}) =>  {
//  console.log(`Good: ${data[0]}\nNeutral: ${data[1]}\nBad: ${data[2]}`);
  // total amount of the feedbacks
  const total = data.reduce((sum, e)  => sum += e, 0);
  //   average rating, given that  bad feedbacks have a subtractive effect   because   positives   equals 1,  neutral   0 and  bad  -1
  const average = ((data[0] + data[1]) - data[2]) / total;
//  console.log(`Average rating: amount of feedbacks is ${total}, so average rating is ${average}`);

//  let's round the average and create a textual representation
  const averageRounded = parseInt(average.toFixed(0));
  const averageAsText = averageRounded ===  1 ? "Good" : averageRounded ===  0 ? "Neutral" : "Bad";

  //  the percentage of positives
  const positives = data[0];
const positivesAsPercents = (100 * (positives/total)).toFixed(0);

if (total == 0) {
  return (
    <div className="alert alert-info"><p>No feedback given</p></div>
  );
}
return (
  <div className="table-responsive">
  <table className="table table-bordered table-striped">
    <tbody>
      <StatisticLine text="Total amount" value={total}/>
      <StatisticLine text="Average rating" value={averageAsText}/>
      <StatisticLine text="Positive ratings (%)" value={positivesAsPercents}/>
    </tbody>
  </table>
  </div>
)
}
/**
 * record in the statistical data 
 * @param {{text: string, value: number | string}}  props
 * @param {string} props.text  heading field of  the record
 * @param {string | number} props.value  value field of the record
 * @returns <tr> containing a <th> for text and <td> for value   
 */
const StatisticLine = ({text, value}) => (<>
<tr>
  <th>{text}</th>
  <td>{value}</td>

</tr>
</>);

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div className="container">
  <h1 className="text-primary">Unicafe feedback site</h1>
  <p className="text-muted">Thanks for visiting our restaurants! Please give us a  rating with the buttons below.</p>
  <div className="row d-flex justify-content">
    <div className="col-auto">
    <Button className="text-success" onClick={() => setGood(good+1)} text="good"/>
    </div>
    <div className="col-auto">
    <Button className="text-warning" onClick={() => setNeutral(neutral+1)} text="neutral"/>
    </div>  
    <div className="col-auto">
    <Button className="text-danger" onClick={() => setBad(bad+1)} text="bad"/>
    </div>
  
  </div>
  <h2 className="mt-4">Statistics</h2>
  <Statistics data={[good, neutral, bad]}/>
  
  
      
    </div>
  )
}

export default App