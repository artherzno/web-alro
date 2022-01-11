import React from 'react'
import Header from '../../components/Header';
import Nav from '../../components/Nav';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Formik, Form, Field } from 'formik';
import CalendarYearTab from './CalendarYearTab'
import CalendarYear1Tab from './CalendarYear1Tab'
import CalendarYear2Tab from './CalendarYear2Tab'


const tabs = [{
    title: 'ปฎิทินใบเตือนหนี้ต้น',
    id: "calendar_year"
},
{
    title: 'ปฎิทินใบเตือนหนี้ต้นครั้งที่ 1',
    id: "calendar_year1"
},{
    title: 'ปฎิทินใบเตือนหนี้ต้นครั้งที 2',
    id: "calendar_year2"
}
/*,{
    title: 'สรุปรายงานอายุความ',
    id: "limit_per_province"
}*/
]

class CalendarYear extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            tabSelected: tabs[0].id
        }

    }

    render() {

        return (
            <div>
                <Header bgColor="bg-light-green" status="logged" />
                <Nav />

                <Box mt={5}>
                    <div >
                        <Box ml={2}>
                            <Grid container spacing={2}>
                                {tabs.map((tab, index) => {
                                    return (
                                        <Grid item key={index}>
                                            <div className={`header-tab ${tab.id === this.state.tabSelected ? 'active' : ''}`} onClick={() => {
                                                this.setState({
                                                    tabSelected: tab.id
                                                })
                                            }}> {tab.title} </div>
                                        </Grid>
                                    )
                                })}

                            </Grid>
                        </Box>

                    </div>
                </Box>
                <div className="line-horizontal" />

                <Box mt={5} ml={2} mr={2} mr={2}>
                    {this.renderContent()}
                </Box>


            </div>
        )
    }

    renderContent() {

        if (this.state.tabSelected === tabs[0].id) {
            return (
                <CalendarYearTab />
            )
        } else if (this.state.tabSelected === tabs[1].id) {
            return (
                <CalendarYear1Tab />
            )
        } else if (this.state.tabSelected === tabs[2].id) {
            return (
                <CalendarYear2Tab />
            )
        } 
    }
}

export default CalendarYear