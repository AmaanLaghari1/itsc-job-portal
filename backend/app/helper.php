<?php

if (!function_exists("removeLeadingZeroes")) {
    function removeLeadingZeroes($input) {
        // Remove zeroes from start
        $input = ltrim($input, '0');

        return $input;
    }
}


if (!function_exists("formatRequestData")) {
    function formatRequestData($data = array()) {
        $requestData = array();

        foreach ($data as $key => $value) {
            $value = removeLeadingZeroes($value);

            // Skip if value is empty string or null
            if ($value === '' || is_null($value)) {
                continue;
            }

            // Preserve original value for 'email'; otherwise convert to uppercase
            $requestData[strtoupper($key)] = $key !== 'email' && $key !== 'password' && $key !== 'profile_image' ? strtoupper($value) : $value;
        }

        return $requestData;
    }
}

function postCURL($_url, $_param,$method="POST"){


    $data_string = json_encode($_param);
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL,$_url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json')
    );
    $output=curl_exec($ch);
    $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    return array("response"=>$output,"response_code"=>$httpcode);
}

