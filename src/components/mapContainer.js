import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdPlace } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
const {kakao} = window


const InfoMap = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
`;

const MapZoom = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
`;

const MapZoomOn = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const MapZoomOff = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

const Map = styled.div`
  width: 70%;
  height: 400px;
  background-color: #e5e5e5;
  border-radius: 8px;
`;

const MapList = styled.div`
  width: 30%;
  height: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  overflow-y: auto;
  margin-left: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const AddressList = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
  line-height: 1.6;
  transition: background-color 0.3s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
  }

  .address_title {
    font-weight: bold;
    margin-bottom: 5px;
    color: #333;
  }

  .address_add1,
  .address_list_add2,
  .address_list_phone {
    display: flex;
    align-items: center;
    margin-top: 8px;
    color: #666;
  }

  .address_add1 svg,
  .address_list_add2 svg,
  .address_list_phone svg {
    margin-right: 5px;
    color: #999;
  }
`;

const PlaceIcon = styled(MdPlace)`
  width: 20px;
  height: 20px;
`;

const PhoneIcon = styled(FaPhoneAlt)`
  width: 20px;
  height: 20px;
`;


const MapContainer = ({searchPlace}) => {

  const[Places, setPlaces] = useState([]);
  const [_map, setMap] = useState();

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex : 1})
    const container = document.getElementById('myMap')
    const options = {
      center : new kakao.maps.LatLng(37.497951, 127.027618),
      level: 3,
    }
    const map = new kakao.maps.Map(container, options)
    const ps = new kakao.maps.services.Places()
    ps.keywordSearch(searchPlace, PlacesSearchDB)

    function PlacesSearchDB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK){
        let bounds = new kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++ ){
          displayMarker(data[i])
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x ))
        }
        map.setBounds(bounds)
        displayPagination(pagination)
        setPlaces(data)
      }
    }
    function displayPagination(pagination) {
      var fragment = document.createDocumentFragment(),i

      for(i = 1; i <= pagination.last; i++){
        var el = document.createElement('a')
        el.href = "＃"
        el.innerHTML = i

        if(i === pagination.current){
          el.className = 'on'
        }else {
          el.onclick = (function (i){
            return function () {
              pagination.gotoPage(i)
            }
          })(i)
        }
        fragment.appendChild(el)
      } 
    }
    function displayMarker(place) {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x),
      })
      kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>')
        infowindow.open(map, marker)
      })
    }
    setMap(map)
  },[searchPlace])

  const zoomOn = () => {
    _map.setZoomable(true);
  }
  const zoomOFF = () => {
    _map.setZoomable(true);
  }





  return(
    <>
    <MapZoom>
          <MapZoomOn onClick={zoomOn}>지도 확대/축소 켜기</MapZoomOn>
          <MapZoomOff onClick={zoomOFF}>지도 확대/축소 끄기</MapZoomOff>
        </MapZoom>
        <InfoMap>
          <Map className="map" id="myMap" level={3}></Map>
          <MapList>
            {Places.map((item, i ) => (
              <AddressList key={i}>
                <span className="address_title">{i + 1}. {item.place_name}</span>
                <span className="address_add1"><PlaceIcon/>{item.address_name}</span>
                {item.road_address_name ? (
                <span className="address_list_add2"><PlaceIcon/> {item.road_address_name}</span>
              ) : (<span></span>)}
              {item.phone ? (
                <span className="address_list_phone"><PhoneIcon/> {item.phone}</span>
              ) : (<span></span>)}
              <br></br>
              </AddressList>
            ))}
          </MapList>
        </InfoMap>
      </>

  )}
  export default MapContainer;