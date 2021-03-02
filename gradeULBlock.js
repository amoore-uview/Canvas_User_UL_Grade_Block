let id = window.location.href.split('users/')[1]
let enrollments = document.querySelector("#courses")
let stdCourses = enrollments.cloneNode(true)

stdCourses.querySelectorAll('li').forEach(listItem => listItem.remove())

let fetchUrl = `/api/v1/users/${id}/courses?include[]=total_scores`;
let options = {
  credentials: "same-origin",
  headers: {
    accept: "application/json",
  },
  timeout: 5000,
};
  
let result;
fetch(fetchUrl, options)
  .then((response) =>
    response
      .json()
      .then((data) => ({
        data: data,
        ok: response.ok,
      }))
  .then((res) => {
    if (res.ok) {
      // console.info(res);
      result = res.data
    }}));
  
let scores = result.map(item => {
    return {
        score: item.enrollments[0]['computed_current_score'],
        name: item.name
    }
})

scores.forEach(score => {
  let {score: theScore, name} = score
  let html = `<li>
  <p style="color:#008ee2;font-size:1.5em;font-weight:bold;margin:0;">${name}</p>
  <p style="margin:-5px 0 0 15px;font-weight:bold;">Current Score: ${theScore ? theScore : 'Not Available'}</p>
  </li>`
  stdCourses.querySelector('ul').innerHTML += html
})

stdCourses.querySelector('legend').innerHTML = 'Grades'
stdCourses.querySelector('h3').innerHTML = `Courses (${stdCourses.querySelectorAll('li').length})`
document.querySelector('#courses').insertAdjacentElement('afterend', stdCourses)
