<script lang="ts">
export default {
  props: {
    city: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["update:city"]
};
</script>

<template>
  <select
    id="filter_city"
    name="miestas"
    class="input-field input-select"
    :title="title"
    :value="city"
    @change="$emit('update:city', $event.target.value)"
  >
    <option value="" selected disabled>{{ title }} </option>
    <optgroup label="Dažniausi maršrutai">
      <option value="Vilnius">Vilnius</option>
      <option value="Kaunas">Kaunas</option>
      <option value="Klaipėda">Klaipėda</option>
      <option value="Šiauliai">Šiauliai</option>
      <option value="Panevėžys">Panevėžys</option>
    </optgroup>
    <optgroup label="Visi miestai">
      <option value="Akmenė">Akmenė</option>
      <option value="Alytus">Alytus</option>
      <option value="Anykščiai">Anykščiai</option>
      <option value="Birštonas">Birštonas</option>
      <option value="Biržai">Biržai</option>
      <option value="Druskininkai">Druskininkai</option>
      <option value="Elektrėnai">Elektrėnai</option>
      <option value="Gargždai">Gargždai</option>
      <option value="Ignalina">Ignalina</option>
      <option value="Jonava">Jonava</option>
      <option value="Joniškis">Joniškis</option>
      <option value="Jurbarkas">Jurbarkas</option>
      <option value="Kaišiadorys">Kaišiadorys</option>
      <option value="Kalvarija">Kalvarija</option>
      <option value="Kazlų Rūda">Kazlų Rūda</option>
      <option value="Kėdainiai">Kėdainiai</option>
      <option value="Kelmė">Kelmė</option>
      <option value="Krekenava">Krekenava</option>
      <option value="Kretinga">Kretinga</option>
      <option value="Kupiškis">Kupiškis</option>
      <option value="Kuršėnai">Kuršėnai</option>
      <option value="Lazdijai">Lazdijai</option>
      <option value="Lentvaris">Lentvaris</option>
      <option value="Marijampolė">Marijampolė</option>
      <option value="Mažeikiai">Mažeikiai</option>
      <option value="Molėtai">Molėtai</option>
      <option value="Naujoji Akmenė">Naujoji Akmenė</option>
      <option value="Neringa">Neringa</option>
      <option value="Pagėgiai">Pagėgiai</option>
      <option value="Pakruojis">Pakruojis</option>
      <option value="Palanga">Palanga</option>
      <option value="Pasvalys">Pasvalys</option>
      <option value="Plungė">Plungė</option>
      <option value="Prienai">Prienai</option>
      <option value="Radviliškis">Radviliškis</option>
      <option value="Raseiniai">Raseiniai</option>
      <option value="Rietavas">Rietavas</option>
      <option value="Rokiškis">Rokiškis</option>
      <option value="Šakiai">Šakiai</option>
      <option value="Šalčininkai">Šalčininkai</option>
      <option value="Šilalė">Šilalė</option>
      <option value="Šilutė">Šilutė</option>
      <option value="Širvintos">Širvintos</option>
      <option value="Skuodas">Skuodas</option>
      <option value="Švenčionys">Švenčionys</option>
      <option value="Tauragė">Tauragė</option>
      <option value="Telšiai">Telšiai</option>
      <option value="Trakai">Trakai</option>
      <option value="Ukmergė">Ukmergė</option>
      <option value="Utena">Utena</option>
      <option value="Varėna">Varėna</option>
      <option value="Vievis">Vievis</option>
      <option value="Vilkaviškis">Vilkaviškis</option>
      <option value="Visaginas">Visaginas</option>
      <option value="Zarasai">Zarasai</option>
    </optgroup>
  </select>
</template>
