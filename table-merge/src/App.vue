<script setup>
import { onMounted, reactive } from "vue";
import { sortBy } from "lodash";
import { GetTestData } from "./apis/api";

const mergeCol = ({ row, column, rowIndex, columnIndex }) => {
  if (columnIndex === 0) {
    const dataList = state.tableData;
    if (
      rowIndex === 0 ||
      (rowIndex > 0 &&
        row[column.property] !== dataList[rowIndex - 1][column.property])
    ) {
      let rowspan = 1;
      let colspan = 1;
      let i = 1;
      while (
        rowIndex + i < dataList.length &&
        row[column.property] === dataList[rowIndex + i][column.property]
      ) {
        rowspan++;
        i++;
      }
      return { rowspan, colspan };
    } else if (
      row[column.property] === dataList[rowIndex - 1][column.property]
    ) {
      return { rowspan: 0, colspan: 0 };
    }
  } else if (columnIndex == 1) {
    const dataList = state.tableData;
    if (
      rowIndex === 0 ||
      (rowIndex > 0 &&
        row[column.property] !== dataList[rowIndex - 1][column.property]) ||
      row.province !== dataList[rowIndex - 1].province
    ) {
      let rowspan = 1;
      let colspan = 1;
      let i = 1;
      while (
        rowIndex + i < dataList.length &&
        row[column.property] === dataList[rowIndex + i][column.property] &&
        row.province == dataList[rowIndex + i].province
      ) {
        rowspan++;
        i++;
      }
      return { rowspan, colspan };
    } else if (
      row[column.property] === dataList[rowIndex - 1][column.property] &&
      row.province == dataList[rowIndex - 1].province
    ) {
      return { rowspan: 0, colspan: 0 };
    }
  }
};

const state = reactive({
  tableData: [],
});

onMounted(() => {
  GetTestData()
    .then(function (resp) {
      state.tableData = sortBy(resp.data, ["province", "dept"]);
      console.table(state.tableData);
    })
    .catch(function (err) {
      console.error(err);
    });
});
</script>

<template>
  <el-table
    :data="state.tableData"
    :border="true"
    :height="640"
    :span-method="mergeCol"
    size="small"
    style="width: 100%"
  >
    <el-table-column prop="province" label="省份" />
    <el-table-column prop="dept" label="部门" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="address" label="网站" />
  </el-table>
</template>

<style scoped>
</style>
