import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PERSON_WITH_CARS } from '../queries'
import { NumberFormat } from '../NumberFormat';
import { Button } from 'antd'
import { useHistory } from 'react-router-dom';
import { List } from 'antd'


const getStyles = () => ({
    container:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    heading: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '20px',
    },
    span:{
        borderBottom: '1px solid rgb(10, 10, 10)'
    },
    list: {
        display: 'flex',
        justifyContent: 'center'
    },
    button:{
        width: '80px',
    }
})

const PersonWithCarsPage = props => {
  const [pid] = useState(props.id)
  const styles = getStyles()

  let history = useHistory();

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, { variables: { personId: pid } });
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  return (
    <div style={styles.container}>
        <div style={styles.heading}><h2><span style={styles.span}>
                {data.personWithCars.person.firstName + " " + 
                data.personWithCars.person.lastName }  </span></h2></div>

        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
            {data.personWithCars.cars.map(({ id, year, make, model, price, personId }) => (
                <List.Item key={id}>
                    <div> <b> Year: </b> {year}</div>
                    <div> <b> Make: </b> {make}</div>
                    <div> <b> Model: </b> {model}</div>
                    <div> <b> Price: </b> {NumberFormat(price)}</div>
                </List.Item>
            ))}
        </List>

        <Button style={styles.button} type='primary' htmlType='submit' onClick={history.goBack}>Go Back</Button>

    </div>
  )
}

export default PersonWithCarsPage
