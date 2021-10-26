import React, { useEffect, useState } from 'react'

import { Form, Input, InputNumber, Button, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { GET_PEOPLE, UPDATE_CAR } from '../../queries'


const UpdateCar = props => {
  const [id] = useState(props.id)
  const [year, setYear] = useState(props.year)
  const [make, setMake] = useState(props.make)
  const [model, setModel] = useState(props.model)
  const [price, setPrice] = useState(props.price)
  const [personId, setPersonId] = useState(props.personId)
  const [updateCar] = useMutation(UPDATE_CAR)
  const { Option } = Select;

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  const getStyles = () => ({
    input: {
      width: '90px',
    }
  })

  const styles = getStyles()

  useEffect(() => {
    forceUpdate()
  }, [])


  const { loading, error, data } = useQuery(GET_PEOPLE);
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value)
    
    switch (variable) {
      case 'year':
        setYear(value)
        break
      case 'make':
        setMake(value)
        break
      case 'model':
        setModel(value)
        break
      case 'price':
        setPrice(value)
        break
      case 'personId':
        setPersonId(value)
        break
      default:
        break
    }
  }

  const onFinish = values => {
    
    let { year, make, model, price, personId } = values
    year = year.toString()
    price = price.toString()

    updateCar({
      variables: {
        id,
        year,
        make, 
        model,
        price,
        personId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        updateCar: {
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

    props.onButtonClick()
  }

  return (
    <Form
      form={form}
      name='update-car-form'
      layout='inline'
      onFinish={onFinish}
      initialValues={{
        year: year, make: make, model: model, price: price, personId: personId
      }}
      size='large'
    >
      <Form.Item name='year' size='small'
        rules={[{ required: true, message: 'Please input a year!' }]}>
        <InputNumber style={styles.input} min={1} max={100000}  onChange={e => updateStateVariable('year', e)} />
        {/* <Input onChange={e => updateStateVariable('year', e.target.value)} /> */}
      </Form.Item>
      <Form.Item name='make' size='small' rules={[{ required: true, message: 'Please input make!' }]}>
        <Input style={styles.input} onChange={e => updateStateVariable('make', e.target.value)} />
      </Form.Item>
      <Form.Item name='model' size='small' rules={[{ required: true, message: 'Please input model!' }]}>
        <Input style={styles.input} onChange={e => updateStateVariable('model', e.target.value)} />
      </Form.Item>
      <Form.Item name='price' size='small' rules={[{ required: true, message: 'Please input price!' }]}>
        <InputNumber style={styles.input} min={1} max={1000000}  onChange={e => updateStateVariable('price', e)} />
      </Form.Item>
      <Form.Item name='personId' size='small' rules={[{ required: true, message: 'Please select person!' }]}>
        <Select
            showSearch
            style={styles.input}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={e => updateStateVariable('personId', e)}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
                {
                    data.people.map(({ id, firstName }, index) => 
                    <Option key={id} value={id} >{firstName}</Option>)
                }
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              (!form.isFieldTouched('year') && !form.isFieldTouched('make') &&
              !form.isFieldTouched('model') && !form.isFieldTouched('price') &&
              !form.isFieldTouched('personId'))  ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }>
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  )
}

export default UpdateCar
