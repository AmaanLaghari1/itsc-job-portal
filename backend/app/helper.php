<?php

if(!function_exists("formatRequestData")){
    function formatRequestData($data=array()){
        $requestData = array();
        foreach ($data as $key => $value) {
            $requestData[strtoupper($key)] = $value;
        }
        return $requestData;
    }
}
