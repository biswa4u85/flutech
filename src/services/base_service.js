import $ from 'jquery';
import {properties} from '../properties';

export function postService(url,dataObj){
    // console.log(properties);
    var property_data = properties;
    var base_url = property_data.apiHost;
    var apiUrl = base_url+url;
    
    return $.ajax({
        url: apiUrl,
        type: 'POST',
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(dataObj)
    })
}

export function getService(url,dataObj){
    // console.log(properties);
    var property_data = properties;
    var base_url = property_data.apiHost;
    var apiUrl = base_url+url;
    
    return $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(dataObj)
    })
}