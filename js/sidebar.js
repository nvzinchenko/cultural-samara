ymaps.ready(['Panel']).then(function () {
    var map = new ymaps.Map("map", {
        center: [53.2066797605117,50.198776651104964],
        zoom: 12,
        controls: []
    });
    // Создадим контент для меток.
    var firstOffice = 'Первый полноценный офис Яндекса появился в Москве в 2001 году. ' +
        'Тогда компания занимала небольшой корпус Вычислительного центра РАН на улице Вавилова, там работало 60 человек.';
    var secondOffice = '<a href="http://www.museum.ru/M1062">Музей "Детская картинная галерея"</a>' +
        '<p><img style="width: 190px;" src="img/office2.jpeg"></p>' +
        '<p>Музей "Детская картинная галерея" ориентирован на ребенка-зрителя и ребенка-художника. При этом акцент делается на самобытность личности ребенка и на восприятие его творчества как искусства.</p>';
    var thirdOffice = '<a href="https://artmus.ru/">Самарский областной художественный музей</a>' +
        '<p><img style="width: 190px;" src="img/office.jpeg"></p>' +
        '<p>Самарский областной художественный музей входит в число крупнейших музеев российской провинции.Это старейшая и наиболее престижная выставочная площадка в Самарской области. Здание музея, построенное в начале ХХ века, - памятник архитектуры федерального значения, одно из красивейших и самых узнаваемых зданий Самары, расположенное в исторической сердцевине города.</p>';
    // Создадим и добавим панель на карту.
    var panel = new ymaps.Panel();
    map.controls.add(panel, {
        float: 'left'
    });
    // Создадим коллекцию геообъектов.
    var collection = new ymaps.GeoObjectCollection(null, {
        // Запретим появление балуна.
        hasBalloon: false,
        iconColor: '#3b5998'
    });
    // Добавим геообъекты в коллекцию.
    collection
        .add(new ymaps.Placemark([53.189432567984994,50.08993206050186], {
            balloonContent: thirdOffice
        }))
        .add(new ymaps.Placemark([53.193414953289945,50.093160805108276], {
            balloonContent: secondOffice
        }))
        .add(new ymaps.Placemark([55.693784, 37.564942], {
            balloonContent: firstOffice
        }));
    // Добавим коллекцию на карту.
    map.geoObjects.add(collection);
    // Подпишемся на событие клика по коллекции.
    collection.events.add('click', function (e) {
        // Получим ссылку на геообъект, по которому кликнул пользователь.
        var target = e.get('target');
        // Зададим контент боковой панели.
        panel.setContent(target.properties.get('balloonContent'));
        // Переместим центр карты по координатам метки с учётом заданных отступов.
        map.panTo(target.geometry.getCoordinates(), {useMapMargin: true});
    });
});
