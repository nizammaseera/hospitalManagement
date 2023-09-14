import React, { Component} from 'react';

import {
    Box,
    Button,
    Heading,
    Grommet,
    FormField,
    Form
} from 'grommet';

import './App.css';

const theme = {
    global: {
        colors: {
            brand: '#000000',
            focus: '#000000'
        },
        font: {
            family: 'Lato',
        },
    },
};
const AppBar = (props) => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        style={{ zIndex: '1' }}
        {...props} />
);

var id;
function tConvert(time) {
  const slicedTime = time.split(/(PM|AM)/gm)[0];

  let [hours, minutes] = slicedTime.split(':');

  if (hours === '12') {
     hours = '00';
  }

  let updateHourAndMin;

  function addition(hoursOrMin) {
     updateHourAndMin =
        hoursOrMin.length < 2
           ? (hoursOrMin = `${0}${hoursOrMin}`)
           : hoursOrMin;

     return updateHourAndMin;
  }

  if (time.endsWith('PM')) {
     hours = parseInt(hours, 10) + 12;
  }

  return `${addition(hours)}:${addition(minutes)}`;
}
export class AddSchedule extends Component {
    componentDidMount() {
  }
    render() {
        return (
            <Grommet theme={theme} full>
                <Box >
                    <AppBar>
                    <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>HMS</Heading></a>
                    </AppBar>
                    <Box pad="small">
                    <Form
                    onSubmit={({ value }) => {
                        let email_in_use = "";
                        console.log(value);
                        fetch("http://localhost:3001/userInSession")
                          .then(res => res.json())
                          .then(res => {
                            console.log(res);
                            var string_json = JSON.stringify(res);
                            var email_json = JSON.parse(string_json);
                            email_in_use = email_json.email;
                            console.log(email_in_use);
                            var st=tConvert(value.starttime);
                            var et=tConvert(value.endtime);
                            var bt=tConvert(value.breaktime);

                            console.log(st);
                            console.log(bt);
                            console.log(et);

                          fetch("http://localhost:3001/addToschedule?email=" + 
                          email_in_use + "&starttime=" + st + "&endtime=" + 
                          et + "&breaktime=" + bt + "&day=" + value.day).then((x)=>{
                            window.alert("Schedule successfully updated!");
                          });
                          });

                    }}>
                        <h3>Create new schedule</h3>
                        <FormField
                            type='time'
                            label="Start Time"
                            name="starttime"
                        />
                        <br />
                        <FormField
                            type='time'
                            label="End Time"
                            name="endtime"
                        />
                        <br />
                        <FormField
                            type='time'
                            label="Break Time"
                            name="breaktime"
                        />
                        <br />
                        <FormField
                            type='string'
                            label="Day"
                            name="day"
                            placeholder="Enter day of the week"
                        />
                        <br />
                        <Button
                            label="Home"
                            href='/DocHome'
                        />
                        <Button
                            type="submit"
                            label="Add"
                            primary
                        />
                    </Form>
                    </Box>
                </Box>
            </Grommet>
        );
    }
}

export default AddSchedule;