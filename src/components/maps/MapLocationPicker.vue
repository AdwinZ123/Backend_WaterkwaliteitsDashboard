<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWR3aW56MTIzIiwiYSI6ImNtNDc1OWI5bjAxcXcya3F4ZjZybTBwejIifQ.oJDL3ndS2BUcpV5wjl0Tuw'

export default {
  props: ['modelValue'],
  methods: {
    getLocation() {
      return {
        ...this.map.getCenter(),
        bearing: this.map.getBearing(),
        pitch: this.map.getPitch(),
        zoom: this.map.getZoom(),
      }
    },
  },
  mounted() {
    const { lng, lat, zoom, bearing, pitch } = this.modelValue

    const map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: 'mapbox://styles/mapbox/satellite-streets-v12', //"mapbox://styles/mapbox/streets-v12", // Replace with your preferred map style
      center: [lng, lat],
      bearing,
      pitch,
      zoom,
    })

    this.map = map

    const updateLocation = () => this.$emit('update:modelValue', this.getLocation())

    map.on('move', updateLocation)
    map.on('zoom', updateLocation)
    map.on('rotate', updateLocation)
    map.on('pitch', updateLocation)

    let marker = new mapboxgl.Marker({ color: 'red' }).setLngLat([lng, lat]).addTo(map)
    map.on('click', (e) => {
      if (marker == null) {
        marker = new mapboxgl.Marker({ color: 'red' }).setLngLat(e.lngLat).addTo(map)
      } else {
        marker.setLngLat(e.lngLat)
        map.flyTo({
          center: e.lngLat,
          speed: 0.2,
        })
      }
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
  min-width: 100px;
  min-height: 300px;
  height: 40vh;
}
</style>
