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
            $requestData[strtoupper($key)] = $key !== 'email' ? strtoupper($value) : $value;
        }

        return $requestData;
    }
}

