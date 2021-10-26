import React from 'react'
import { useQuery } from '@apollo/client'
import { List } from 'antd'
import Person from '../../listItems/Person'
import { GET_PEOPLE, GET_CARS } from '../../queries'

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center'
  }
})

const People = () => {
  const styles = getStyles()

  const peopleInfo = useQuery(GET_PEOPLE)
  const carInfo = useQuery(GET_CARS);
  
  if (peopleInfo.loading) return 'Loading...'
  if (peopleInfo.error) return `Error! ${peopleInfo.error.message}`

  if (carInfo.loading) return 'Loading...'
  if (carInfo.error) return `Error! ${carInfo.error.message}`

  return (
    <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
      {peopleInfo.data.people.map(({ id, firstName, lastName }) => (
        
        <List.Item key={id}>
          <Person key={id} id={id} firstName={firstName} lastName={lastName} cars={
            carInfo.data.cars.filter(x => x.personId === id)
          } />
        </List.Item>
      ))}
    </List>
  )
}

export default People
