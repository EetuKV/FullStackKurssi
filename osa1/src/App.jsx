/**
 * komponentti joka tuottaa kurssisivun otsikon 
 * @param {Object} props attribuutit  
 * @returns h1-elementin, jossa lukee  course-attribuutin arvo
 */

const Header = (props) => (<><h1>{props.course}</h1>
</>);
 
/**
 * tekee listauksen kurssin osista ja niiden harjoitusten lukumääristä 
 * @param {Object} props attribuutit, joissa on listaus osista nimineen ja tehtävien lukumäärineen 
 * @returns listauksen osien nimistä ja tehtävien lukumääristä kappale-elementteinä 
 */
const Content = (props) =>  {
  const paragraphs = props.partsAndExercises.map((e) => (<Part key={e.part} name={e.part} exercises={e.exercises}/>)); 
  return (<>{paragraphs}</>);


  
}

/**
 *  sisältää tehtäväosion tiedot
 * @param {Object} props attribuutit 
 * @returns kappale-elementin, jossa attribuuteissa olevat osan tiedot eli nimi ja tehtävien lukumäärä 
 */
const Part = (props) => (<><p>{props.name} {props.exercises}</p></>);

/**
 *  laskee osien harjoitusten summan
 * @param {Object} props  attribuutit, joissa on listaus osista nimineen ja tehtävien lukumäärineen
 * @returns kappale-elementin jossa on harjotusten lukumäärä 
 */
const Total = (props) => {
  const numberOfExercises = props.partsAndExercises.reduce((sum, e) => sum += e.exercises, 0);
  return (<><p>Number of exercises {numberOfExercises}</p></>); 

}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const partsAndExercises = [
    {part: part1, exercises: exercises1}, 
    {part: part2, exercises: exercises2}, 
    {part: part3, exercises: exercises3}];

  return (
    <div>
      <Header course={course}/>
      <Content partsAndExercises={partsAndExercises}/>
      <Total partsAndExercises={partsAndExercises}/>
    </div>
  )
}

export default App