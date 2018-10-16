import React from 'react'

const ProjectInfo = ({ project }) => {
  return (
    <div className='project-info'>
      <div>
        <b>Hankenumero</b>
        <p>{ project.projectNumber }</p>
      </div>

      <div>
        <b>Diaarinumero</b>
        <p>{ project.diaari }</p>
      </div>

      <div>
        <b>Kaavanumero</b>
        <p>{ project.projectCode }</p>
      </div>

      <div>
        <b>Kaavaprosessi</b>
        <p>{ project.size }</p>
      </div>

      <div>
        <b>Uusi asuminen</b>
        <p>{ project.newResidency } k-m^2</p>
      </div>

      <div>
        <b>Uudet toimitilat</b>
        <p>{ project.neBusinessPremises } k-m^2</p>
      </div>

      <div>
        <b>Aikataulu</b>
        { project.schedule.map((time, i) => <p key={i}>{ time }</p>) }
      </div>

      <div>
        <b>Maanomistus</b>
        <p>{ project.landowning }</p>
      </div>

      <div>
        <b>Vastuuhenkilöt</b>
        { project.inCharge.map((person, i) => <p key={i}>{ person }</p>) }
      </div>

      <div>
        <b>Kaupungin strategiset tavoitteet</b>
        { project.strategicGoals.map((strategy, i) => <p key={i}>{ strategy }</p>) }
      </div>

      <div>
        <b>Kuvaus sisällöstä</b>
        <p>{ project.description }</p>
      </div>
    </div>
  )
}

export default ProjectInfo