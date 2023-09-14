import React, { Component, useState, useEffect } from 'react';
import {
  Box,
  FormField,
  Button,
  Heading,
  Form,
  TextArea,
  Grommet,
  Select
} from 'grommet';
import './App.css';
const theme = {
  global: {
    colors: {
      brand: '#000000',
      focus: "#000000",
      active: "#000000",
    },
    font: {
      family: 'Lato',
    },
  },
};

var theConcerns;
var theSymptoms;
var theDoc;
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

const ConcernsTextArea = () => {
  const [value, setValue] = React.useState("");

  const onChange = event => {
    setValue(event.target.value);
    theConcerns = event.target.value;
  };

  return (
    <Grommet theme={theme}>
      <Box
        width="medium"
        height="xsmall"
      >
      <TextArea
        placeholder="Enter your concerns..."
        value={value}
        onChange={onChange}
        fill
        required />
      </Box>
    </Grommet>
  );
};

const SymptomsTextArea = () => {
  const [value, setValue] = React.useState("");

  const onChange = event => {
    setValue(event.target.value);
    theSymptoms = event.target.value;
  };

  return (
    <Grommet theme={theme}>
      <Box
        width="medium"
        height="xsmall"
      >
        <TextArea
          placeholder="Enter your symptoms..."
          value={value}
          onChange={onChange} fill
          required />
      </Box>
    </Grommet>
  );
};

function DoctorsDropdown() {
  const [value, setValue] = useState();
  const [doctorsList, setList] = useState([]);
  useEffect(() => {    
    fetch("http://localhost:3001/docInfo")
    .then(res => res.json())
    .then(res => {
      let arr = []
      res.data.forEach(i => {
        let tmp = `${i.name} (${i.email})`;
        arr.push(tmp);
      });
      setList(arr);
    });
  }, []);
  const onChange = event => {
    setValue(event.value);
    let doc = event.value.match(/\((.*)\)/)[1];
    theDoc = doc;
  };
  return (
    <Select
      options={doctorsList}
      value={value}
      placeholder="Select Doctor"
      onChange={onChange} fill
      required
    />
  );
}

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
export class SchedulingAppt extends Component {
  constuctor() {
  }
  render() {
    return (
      <Grommet theme={theme} full>
        <AppBar>
        <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>HMS</Heading></a>
        </AppBar>
        <Box align="center" pad="small" gap="small">
          <Form
            onSubmit={({ value }) => {
              //probably fetch uid here, add one
              fetch("http://localhost:3001/userInSession")
                .then(res => res.json())
                .then(res => {
                  var t=tConvert(value.time);
                  var d=value.date;
                  var string_json = JSON.stringify(res);
                  var email_json = JSON.parse(string_json);
                  let email_in_use = email_json.email;
                  fetch("http://localhost:3001/checkIfApptExists?email=" + email_in_use + "&startTime=" + t + "&date=" + d + "&docEmail=" + theDoc)
                    .then(res => res.json())
                    .then(res => {
                      if ((res.data[0])) {
                        window.alert("Appointment Clash! Try another doctor or date/time");
                      } else {
                        fetch("http://localhost:3001/genApptUID")
                          .then(res => res.json())
                          .then(res => {
                            var string_json = JSON.stringify(res);
                            var uid_json = JSON.parse(string_json);
                            let gen_uid = uid_json.id;
                            console.log(gen_uid);

                            let parsedTime = t.split(":");
                            let startHour = parseInt(parsedTime[0], 10);
                            let endHour = startHour + 1;
                            let endTime = `${endHour}:00`;
                            
                            fetch("http://localhost:3001/schedule?time=" + t + "&endTime=" + endTime +
                              "&date=" + d + "&concerns=" + theConcerns + "&symptoms=" + theSymptoms + 
                              "&id=" + gen_uid + "&doc=" + theDoc).then((x)=>{
                              fetch("http://localhost:3001/addToPatientSeeAppt?email=" + email_in_use + "&id=" + gen_uid +
                                "&concerns=" + theConcerns + "&symptoms=" + theSymptoms).then((x)=>{
                                  window.alert("Appointment successfully scheduled!");
                                });
                            })
                          });
                      }
                    });
                });
            }}
          >
            <Box align="center" gap="small">
              <DoctorsDropdown />
            </Box>
            <FormField
              type='date'
              label="Select Date"
              name="date"
             />
            <FormField
              type='time'
              label="Select Time"
              name="time"
             />
            <ConcernsTextArea />
            <br />
            <SymptomsTextArea />
            <br />
            <Box align="center" pad="small" gap="small">
              <Button
                label="Attempt To Schedule"
                type="submit"
                primary
              />
            </Box>
          </Form>
        </Box>
      </Grommet>
    );
  }
}
export default SchedulingAppt;