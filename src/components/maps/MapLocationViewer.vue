<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWR3aW56MTIzIiwiYSI6ImNtNDc1OWI5bjAxcXcya3F4ZjZybTBwejIifQ.oJDL3ndS2BUcpV5wjl0Tuw'

export default {
  props: ['locations', 'onSelectLocationChange'],
  methods: {},
  mounted() {
    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [23.988634, -31.554709],
      bearing: 0,
      pitch: 0,
      zoom: 9,
    })

    this.map = map

    this.locations.forEach((locatie) => {
      const locationCoordinates = locatie.locatie.split(',')
      const lng = locationCoordinates[0]
      const lat = locationCoordinates[1]

      let marker = new mapboxgl.Marker({ color: locatie.statusColor })
        .setLngLat([lng, lat])
        .addTo(map)

      marker.getElement().addEventListener('click', () => {
        this.onSelectLocationChange(locatie)
      })
    })

    map.on('click', (e) => {
      map.flyTo({
        center: e.lngLat,
        speed: 0.2,
      })
    })
  },
  unmounted() {
    this.map.remove()
    this.map = null
  },
}
</script>

<style scoped>
.map-container {
  flex: 1;
  min-width: 250px;
  min-height: 250px;
  height: 40vh;
}
</style>
