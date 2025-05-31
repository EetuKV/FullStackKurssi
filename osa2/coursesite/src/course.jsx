/**
 *  header of the course data
 * @param {string} props.course name of the course 
 * @returns a <h2> element with the course name 
 */
const Header = ({course}) => (<><h2 className="text-primary mt-4">{course}</h2>
</>);
/**
 *  the  course data 
 * @param {array}  props.partsAndExercises course data 
 * @returns  elements data about individual parts and exercises of the course 
 */
const Content = ({partsAndExercises}) =>  {
    const paragraphs = partsAndExercises.map((e) => (<Part key={e.id} name={e.name} exercises={e.exercises}/>)); 
    return    (<div className="ps-3">
      {paragraphs}
    </div>);
  
  
    
  }
  /**
   *  record in the course data, containing data  related to an individual part of the course
   * @param {string}  props.name  name of the part
   * @param {number} props.exercises number of exercises
   * @returns a <p> element containing the data 
   */
  const Part = ({name, exercises}) => (<><p className="mb-1">{name} {exercises}</p></>);
/**
 *  counts the  total amount of exercises of the course
 * @param {array} props.partsAndExercises data about parts 
 * @returns a <p> element containing the total amount 
 */
  const Total = ({partsAndExercises}) => {
    const numberOfExercises = partsAndExercises.reduce((sum, e) => sum += e.exercises, 0);
    return (<><p className="fw-bold">Number of exercises {numberOfExercises}</p></>); 
  
  }
  
const Course = ({course}) =>  {

  

return (
    <div className="card mb-4 shadow-sm">
    <Header course={course.name}/>
    <Content partsAndExercises={course.parts}/>
      <Total partsAndExercises={course.parts}/>

    </div>
);
}

export default Course