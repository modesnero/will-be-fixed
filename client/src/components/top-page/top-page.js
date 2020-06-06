import React from 'react'
import { Table, Button } from 'react-bootstrap'

export default function TopPage () {
  return (
    <div>
      <Table striped bordered hover className='table-light'>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Голоса</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Влад</td>
            <td>Наговицын</td>
            <td>2</td>
            <td>
              <Button size='sm' className='m-0 mr-5'>
                Просмотр
              </Button>
              <Button size='sm' className='m-0'>
                Проголосовать
              </Button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Адель</td>
            <td>Ярова</td>
            <td>1</td>
            <td>
              <Button size='sm' className='m-0 mr-5'>
                Просмотр
              </Button>
              <Button size='sm' className='m-0'>
                Проголосовать
              </Button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Максим</td>
            <td>Дзись</td>
            <td>0</td>
            <td>
              <Button size='sm' className='m-0 mr-5'>
                Просмотр
              </Button>
              <Button size='sm' className='m-0'>
                Проголосовать
              </Button>
            </td>
          </tr>
          <tr>
            <td>4</td>
            <td>Владимир</td>
            <td>Дорошенко</td>
            <td>0</td>
            <td>
              <Button size='sm' className='m-0 mr-5'>
                Просмотр
              </Button>
              <Button size='sm' className='m-0'>
                Проголосовать
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}
