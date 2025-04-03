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
  const paragraphs = props.partsAndExercises.map((e) => (<Part key={e.name} name={e.name} exercises={e.exercises}/>)); 
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course.name}/>
      <Content partsAndExercises={course.parts}/>
      <Total partsAndExercises={course.parts}/>
    </div>
  )
}

export default App