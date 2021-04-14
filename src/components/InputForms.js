import React,{useReducer, useState, useEffect} from 'react';
import InputFormRemote from './InputFormRemote'
import InputFormLocal from './InputFormLocal'

const InputForms = ({rtcClient}) => {
    if (rtcClient === null) return <></>;

    return (
        <>
            <InputFormLocal rtcClient={rtcClient} />
            <InputFormRemote rtcClient={rtcClient} />
        </>
    )

}

export default InputForms;