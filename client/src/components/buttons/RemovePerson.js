import React from 'react'
import { useMutation } from '@apollo/client'
import { filter } from 'lodash'

import { DeleteOutlined } from '@ant-design/icons'
import { GET_CARS, GET_PEOPLE, REMOVE_PERSON, REMOVE_CARS } from '../../queries'

const RemovePerson = ({ id, firstName, lastName }) => {
  let year, make, model, price, personId = id;

  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { people } = cache.readQuery({ query: GET_PEOPLE })
      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: filter(people, c => {
            return c.id !== removePerson.id
          })
        }
      })
    }
  })

  const [removeCars] = useMutation(REMOVE_CARS, {
    update(cache, { data: { removeCars } }) {
      const { cars } = cache.readQuery({ query: GET_CARS })
      cache.writeQuery({
        query: GET_CARS,
        data: {
          cars: filter(cars, c => {
                  return c.personId !== personId
                })
        }
      })
    }
  })

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this person?')

    if (result) {
      removePerson({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removePerson: {
            __typename: 'Person',
            id,
            firstName,
            lastName
          }
        }
      })

      removeCars({
        variables: {
          personId
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeCars: {
            __typename: 'Car',
            id,
            year,
            make,
            model,
            price,
            personId
          }
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={handleButtonClick} style={{ color: 'red' }} />
}

export default RemovePerson
