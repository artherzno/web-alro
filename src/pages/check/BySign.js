import React from  'react'
import { DatePicker, SortCheck, DisplayCheck} from '../../components/check'
import {MuiTextfield} from '../../components/MUIinputs'

class BySign extends React.Component{

    render(){

        return(
            <div>
                <DatePicker/>
                <MuiTextfield/>
                <SortCheck/>
                <DisplayCheck/>
            </div>
        )
    }
}

export default BySign