var app = angular.module('ybot', []);

/*
 * This is main angular controller for Ybot web interface
 */
function YbotController ($scope, $http) {
    var req_url = window.location.pathname + 'admin';

    // click on ybot plugins side bar
    $scope.acive_ybot_settings = function(){
        // setup header
        $scope.header = $('a_ybot_plugins').innerHTML;
        // active current li
        activate_li('li_ybot_plugins', 'div_ybot_plugins');
        
        // Send request for getting current settings
        $http.get(req_url + "?req=ybot_plugins_settings").success(function (data) {
            // Observer part
            if (data.is_observer == true)
                $('checkbox_is_observer').checked = true;
            else
                $('checkbox_is_observer').checked = false;

            // History part
            if (data.is_history == true)
                $('checkbox_is_history').checked = true;
            else
                $('checkbox_is_history').checked = false;

            $('input_observer_timeout').value = data.observer_timeout;
            $('input_history_limit').value = data.history_limit;
        });
        // return
        return true;
    }

    // click on update observer button
    $scope.update_observer_settings = function(){
        // get observer timeout value
        var obs_timeout = $('input_observer_timeout').value;
        // get using observer or not value
        var is_observer = $('checkbox_is_observer').checked;
        // check observer timeout
        if (isInt(obs_timeout) == false || obs_timeout <= 0){
            $('input_observer_timeout').value = '';
            $('span_observer_error1').style.visibility = "visible";
            return false;
        }
        else{
            $('span_observer_error1').style.visibility = "hidden";
            // send request update observer settings
            var data = {'is_observer' : is_observer, 'timeout' : obs_timeout};
            $http.post(req_url + '?req=update_observer_settings', data);
            // return
            return true;
        }
    }

    // click on update history button
    $scope.update_history_settings = function(){
        // get history limit value
        var history_limit = $('input_history_limit').value;
        // get using history or not value
        var is_history = $('checkbox_is_history').checked;
        // check history limit
        if (isInt(history_limit) == false || history_limit <= 0){
            $('input_history_limit').value = '';
            $('span_observer_error2').style.visibility = "visible";
            return false;
        }
        else{
            $('span_observer_error2').style.visibility = "hidden";
            // send request to update history settings
            var data = {'is_history' : is_history, 'limit' : history_limit};
            $http.post(req_url + '?req=update_history_settings', data);
            // return
            return true;
        }
    }

    // click on upload plugin side bar
    $scope.active_upload_plugin = function(){
        // setup header
        $scope.header = $('a_ybot_upload_plugin').innerHTML;
        // active current li
        activate_li('li_ybot_upload_plugin', 'div_ybot_upload');
        // return
        return true;
    }

    // click on runned transport side bar
    $scope.active_runned_transport = function(){
        // setup header
        $scope.header = $('a_ybot_runned_transports').innerHTML;
        // active current li
        activate_li('li_runned_transports', 'div_ybot_transports');
        // return
        return true;
    }

    // click on new transport side bar
    $scope.active_new_transport = function(){
        // setup header
        $scope.header = $('a_ybot_new_transport').innerHTML;
        // active current li
        activate_li('li_start_new_transport', 'div_ybot_runned_transports');
        // return
        return true;
    }

    // click on storage options side bar
    $scope.active_ybot_storage = function(){
        // setup header
        $scope.header = $('a_ybot_storage_opts').innerHTML;
        // active current li
        activate_li('li_storage_option', 'div_ybot_storage');
        // return
        return true;
    }
    
    /*
     * Handle main page
     */

    // Send request for front page
    $http.get(req_url + "?req=main_web_interface_req").success(function (data) {
        $scope.transports = data.transport.split('\n').splice(0, data.transport.split('\n').length - 1);
        $scope.plugins = data.plugins.split('\n').splice(0, data.plugins.split('\n').length - 1);
        $scope.plugins_directory = data.plugins_directory;
        $scope.is_history = data.is_history;
        $scope.history_limit = data.history_limit;
        $scope.is_observer = data.is_observer;
        $scope.observer_timeout = data.observer_timeout;
        $scope.storage_type = data.storage_type;
    });

    // put main header in content div
    $scope.header = 'Ybot web interface';
    // activate li
    activate_li('li_web_interface', 'div_ybot_web_interface');
};

/*
 * Helper functions
 */

function activate_li(li_id, div_id){
    var divs = new Array('div_ybot_web_interface', 'div_ybot_plugins', 'div_ybot_upload', 
                         'div_ybot_transports', 'div_ybot_runned_transports', 'div_ybot_storage');
    // hide all divs
    divs.each(function(div){
        $(div).style.visibility = "hidden";
    });
    // activate li with id == li_id
    $$('li').each(function(li){     
        if (li.className == "active")
            li.className = "";

        if (li.id == li_id)
            $(li_id).className = "active";
    });

    // show main content
    $(div_id).style.visibility = "visible";
}

function isInt(n) {
    if (Math.floor(n) == n)
        return true;
    else
        return false;
}