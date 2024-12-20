<template>
  <label :class="['tw-block tw-capitalize tw-text-gray-700 tw-text-sm tw-font-semibold']" v-if="label !== ''">
    {{ label }}
    <span v-if="isRequired" class="tw-text-red-600">*</span>
  </label>
  <div class="date-range-picker tw-relative" :class="'tw-h-[' + height + '] ' + 'tw-w-[' + width + ']'">
    <InputText :class="['tw-w-full !tw-rounded-2xl !tw-text-base', computedClass]" v-model="displayValue" @click="toggleDropdown" readonly :placeholder="placeholder">
      <template #inputicon="slotProps">
        <img class="tw-inline-block" src="/images/calendar.svg" alt="calendar-icon" @click="slotProps.clickCallback" />
      </template>
    </InputText>
    <Select v-show="isDropdownVisible" ref="dpSelect" class="!tw-relative tw-invisible !tw-inline-flex tw-top-0 tw-left-0" :pt="{ emptyMessage: { class: 'tw-p-1' } }">
      <template #header>
        <div class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2">
          <DatePicker
            :view="view"
            @click.stop="() => {}"
            :pt="{ panel: { class: ' !tw-border-none' }, dayCell: { style: 'width:21px height:21px; font-size:16px; padding:0px' } }"
            label="Start Date"
            class="tw-w-full"
            :inline="true"
            dateFormat="yy-mm-dd"
            v-model="startDate"
            :placeholder="startPlaceholder"
            :maxDate="maxDate"
            @date-select="onStartDateChange"
            height="340px" />
          <DatePicker
            :view="view"
            @click.stop="() => {}"
            :pt="{ panel: { class: ' !tw-border-none' }, dayCell: { style: 'width:21px height:21px; font-size:16px; padding:0px' } }"
            dateFormat="yy-mm-dd"
            :inline="true"
            height="340px"
            label="End Date"
            v-model="endDate"
            :placeholder="endPlaceholder"
            :minDate="startDate"
            :maxDate="maxDate"
            @date-select="onEndDateChange" />
        </div>
      </template>
      <template #empty>
        <div v-if="isInvalidRange" style="color: red">End date must be after start date.</div>
        <h3 v-else class="tw-text-center tw-p-3">Select Date Range</h3>
      </template>
    </Select>
  </div>
</template>

<script>
import { ref, computed, useTemplateRef } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import DatePicker from "primevue/datepicker";
import Button from "primevue/button";
import { useGlobalsStore } from "@/stores/globals";

export default {
  name: "DateRangePicker",
  components: {
    InputText,
    Select,
    DatePicker,
    Button,
  },
  props: {
    view: {
      default: "date",
    },
    width: {
      default: "200px",
    },
    placeholder: {
      type: String,
      default: "Select Date Range",
    },
    startPlaceholder: {
      type: String,
      default: "Start Date",
    },
    endPlaceholder: {
      type: String,
      default: "End Date",
    },
    maxDate: {
      type: Date,
      default: null,
    },
    dateFormat: {
      type: String,
      default: "yy-mm-dd",
    },
    noborder: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    isRequired: {
      type: Boolean,
      default: false,
    },
    height: {
      default: "38px",
    },
    size: {
      type: String,
      default: "medium",
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const startDate = ref(null);
    const endDate = ref(null);
    const isDropdownVisible = ref(false);
    const global = useGlobalsStore();
    const displayValue = ref(null);
    const dpSelect = useTemplateRef("dpSelect");

    const months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    const monthDays = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };

    const computedClass = computed(() => {
      return [
        {
          "!tw-py-1 tw-h-[42px]": props.size === "small",
          "!tw-py-3 !tw-h-[48px]": props.size === "medium",
        },
      ];
    });

    const isInvalidRange = computed(() => {
      return startDate.value && endDate.value && new Date(startDate.value) > new Date(endDate.value);
    });

    const isDate = (value) => {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(value)) {
        return false;
      }
      const date = new Date(value);
      return !isNaN(date.getTime());
    };

    const formatDate = (date, o = false) => {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      if (o) {
        return [year, month, day].join("-");
      }
      return day + " " + months[month] + " " + year.toString().slice(2, 4);
    };

    const openD = () => {
      dpSelect.value.show();
    };

    const toggleDropdown = () => {
      openD();
      isDropdownVisible.value = !isDropdownVisible.value;
    };

    const onStartDateChange = (date) => {
      displayValue.value = `${formatDate(startDate.value)} ⇢`;
      if (endDate.value && new Date(date) > new Date(endDate.value)) {
        endDate.value = null;
      }
    };

    const onEndDateChange = (date) => {
      if (startDate.value) {
        let start = "";
        let end = "";

        if (props.view === "year") {
          start = new Date(new Date(startDate.value).getFullYear(), 0, 1);
          end = new Date(new Date(endDate.value).getFullYear(), 11, 31);
        } else if (props.view === "month") {
          const s = new Date(startDate.value);
          const d = new Date(endDate.value);
          start = new Date(s.getFullYear(), s.getMonth(), 1);
          const dd = monthDays[d.getMonth() + 1];
          end = new Date(d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + dd);
        } else {
          start = new Date(startDate.value);
          end = new Date(endDate.value);
        }

        start = formatDate(start, true);
        end = formatDate(end, true);

        emit("change", [start, end]);

        start = formatDate(start, false);
        end = formatDate(end, false);
        displayValue.value = `${start} ⇢ ${end}`;
        dpSelect.value.hide();
      }
    };

    const confirmSelection = () => {
      if (dpSelect.value) {
        dpSelect.value.hide();
        isDropdownVisible.value = false;
      }
    };

    return {
      startDate,
      endDate,
      isDropdownVisible,
      global,
      displayValue,
      months,
      monthDays,
      computedClass,
      isInvalidRange,
      isDate,
      formatDate,
      openD,
      toggleDropdown,
      onStartDateChange,
      onEndDateChange,
      confirmSelection,
    };
  },
};
</script>
