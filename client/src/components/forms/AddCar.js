import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { Form, Input, Button, Select, InputNumber } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { ADD_CAR, GET_CARS, GET_PEOPLE } from '../../queries'

const AddCar = () => {
  const [id] = useState(uuidv4())
  const [form] = Form.useForm()
  const { Option } = Select;
  const [, forceUpdate] = useState()
  const [addCar] = useMutation(ADD_CAR)

  useEffect(() => {
    forceUpdate({})
  }, [])

  const peopleInfo = useQuery(GET_PEOPLE);
  if (peopleInfo.loading) return 'Loading...'
  if (peopleInfo.error) return `Error! ${peopleInfo.error.message}`


  const getStyles = () => ({
    input: {
      width: '90px',
    }
  })
  
  const styles = getStyles()


  const onFinish = values => {
    let { year, make, model, price, personId } = values
    year = year.toString()
    price = price.toString()

    addCar({
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
        addCar: {
          __typename: 'Car',
          id,
          year,
          make,
          model,
          price,
          personId,
        },
      },
      update: (proxy, { data: {addCar} }) => {
        try {
        let data = proxy.readQuery({ query: GET_CARS, });
        let latest = [...data.cars, addCar];

        proxy.writeQuery({
          query: GET_CARS,
          data: {
            cars: latest,
          },
        });
      
      }catch(error) {
            console.error("Error" + error);      
        }
      },
      

    });
  };

  return (
    <Form
      form={form}
      name='add-car-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={{ marginBottom: '40px' }}
    >
      <Form.Item name='year' size='small'
        rules={[{ required: true, message: 'Please input a year!' }]}>
        <InputNumber style={styles.input} min={1} max={100000} placeholder='i.e. 2016'  />
      </Form.Item>
      <Form.Item name='make' size='small' rules={[{ required: true, message: 'Please input make!' }]}>
        <Input style={styles.input} placeholder='i.e. Toyota'  />
      </Form.Item>
      <Form.Item name='model' size='small' rules={[{ required: true, message: 'Please input model!' }]}>
        <Input style={styles.input} placeholder='i.e. Corolla'  />
      </Form.Item>
      <Form.Item name='price' size='small' rules={[{ required: true, message: 'Please input price!' }]}>
        <InputNumber style={styles.input} min={1} max={1000000} placeholder='i.e. 24000'   />
      </Form.Item>
      <Form.Item name='personId' size='small' rules={[{ required: true, message: 'Please select person!' }]}>
        <Select
            showSearch
            style={styles.input}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
                {
                  peopleInfo.data.people !== undefined && 
                  peopleInfo.data.people.map(({ id, firstName }, index) => 
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
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }>
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

export default AddCar
