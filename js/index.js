;
(function($) {
    var currentTemp = '';

    function getIcon(type) {
        var number = parseInt(type);
        switch (number) {
            case 1:
                return 'sunny';
            case 2:
            case 3:
            case 4:
                return 'cloudy';
            case 9:
                return 'sun-shower';
            case 10:
                return 'rainy';
            case 11:
                return 'thunder-storm';
            case 12:
                return 'flurries';
            default:
                return 'cloudy';
        }

    }

    function getWeather(lat, lon) {
        if (!(lat && lon))
            return;
        var appId = 'XXXX-YYYY-ZZZZ';
        var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + appId + '&units=metric';
        $.ajax({
            url: url,
            dataType: 'json',
            success: function(data) {
                $("#location").text(data.name);
                $("#weather-desc").text(data.weather[0].main);
                currentTemp = data.main.temp;
                $("#weather-temp").html(Math.floor(currentTemp) + ' &deg;C');
                $('.switch input').prop('checked', false);
                $('.icon').addClass('hide');
                var icon = getIcon(data.weather[0].icon);
                $('.icon.' + icon).removeClass('hide');
                $('#time').text(new Date().toLocaleString());

            },
            error: function(err) {

            }
        });

    }

    function getCurrentPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lon = position.coords.longitude;
                getWeather(lat, lon);
            });
        }
    }

    function tempConverter(data) {
        var state = $('.switch input').prop('checked');

        var result = '';
        if (state) {
            var farenheit = (currentTemp * (9 / 5)) + 32;
            result = Math.floor(farenheit) + " &deg; F";
        } else {
            result = Math.floor(currentTemp) + " &deg; C";
        }
        $('#weather-temp').html(result);
    }

    $(document).ready(function() {
        getCurrentPosition();
        $('#replay').on('click', function() {
            getCurrentPosition();
        });
        $('.switch input').on('change', function() {
            tempConverter();
        });
    });

})(jQuery)