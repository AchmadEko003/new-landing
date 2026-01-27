<script lang="ts" setup>
import DOMPurify from 'dompurify'

const props = defineProps<{
  content: string
}>()

const sanitizedContent = computed(() => {
  if (!props.content) return ''

  return DOMPurify.sanitize(props.content)
})
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="ql-editor animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div class="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </template>
    <div
      class="ql-editor"
      v-html="sanitizedContent"
    />
  </ClientOnly>
</template>

<style scoped>
/* ===== Bullet & List Styles ===== */
.ql-editor :deep(ul),
.ql-editor :deep(ol) {
  padding-left: 1.5em;
  margin: 0.5em 0;
  list-style-type: disc;
}

.ql-editor :deep(ul ul),
.ql-editor :deep(ol ol) {
  list-style-type: disc;
}

.ql-editor :deep(ul ul ul),
.ql-editor :deep(ol ol ol) {
  list-style-type: disc;
}

.ql-editor :deep(li) {
  padding-left: 0.5em;
  margin: 0.25em 0;
}

/* Quill specific list classes */
.ql-editor :deep(.ql-indent-1) {
  padding-left: 3em;
}

.ql-editor :deep(.ql-indent-2) {
  padding-left: 6em;
}

.ql-editor :deep(.ql-indent-3) {
  padding-left: 9em;
}

.ql-editor :deep(.ql-indent-4) {
  padding-left: 12em;
}

.ql-editor :deep(.ql-indent-5) {
  padding-left: 15em;
}

.ql-editor :deep(.ql-indent-6) {
  padding-left: 18em;
}

.ql-editor :deep(.ql-indent-7) {
  padding-left: 21em;
}

.ql-editor :deep(.ql-indent-8) {
  padding-left: 24em;
}

/* Checklist styles */
.ql-editor :deep(ul[data-checked="true"]),
.ql-editor :deep(ul[data-checked="false"]) {
  list-style-type: none;
  padding-left: 1.5em;
}

.ql-editor :deep(li[data-list="checked"]),
.ql-editor :deep(li[data-list="unchecked"]) {
  list-style-type: none;
  position: relative;
}

.ql-editor :deep(li[data-list="checked"]::before) {
  content: '☑';
  position: absolute;
  left: -1.5em;
}

.ql-editor :deep(li[data-list="unchecked"]::before) {
  content: '☐';
  position: absolute;
  left: -1.5em;
}

/* ===== Table Styles ===== */
.ql-editor :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 1em 0;
  table-layout: fixed;
}

.ql-editor :deep(table td),
.ql-editor :deep(table th) {
  border: 1px solid #e5e7eb;
  padding: 0.75em 1em;
  text-align: left;
  vertical-align: top;
  word-wrap: break-word;
}

.ql-editor :deep(table th) {
  background-color: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.ql-editor :deep(table tr:nth-child(even) td) {
  background-color: #f9fafb;
}

.ql-editor :deep(table tr:hover td) {
  background-color: #f3f4f6;
}

/* Table responsive wrapper */
.ql-editor :deep(table) {
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.ql-editor :deep(tbody),
.ql-editor :deep(thead) {
  display: table;
  width: 100%;
}

/* Quill table specific classes */
.ql-editor :deep(.ql-table) {
  border-collapse: collapse;
  width: 100%;
}

.ql-editor :deep(.ql-table td) {
  border: 1px solid #e5e7eb;
  padding: 0.75em 1em;
}

/* Table alignment */
.ql-editor :deep(td.ql-align-center),
.ql-editor :deep(th.ql-align-center) {
  text-align: center;
}

.ql-editor :deep(td.ql-align-right),
.ql-editor :deep(th.ql-align-right) {
  text-align: right;
}

.ql-editor :deep(td.ql-align-justify),
.ql-editor :deep(th.ql-align-justify) {
  text-align: justify;
}

/* ===== Additional Typography ===== */
.ql-editor :deep(blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1em;
  margin: 1em 0;
  color: #6b7280;
  font-style: italic;
}

.ql-editor :deep(pre) {
  background-color: #f3f4f6;
  border-radius: 0.5em;
  padding: 1em;
  overflow-x: auto;
  font-family: ui-monospace, monospace;
  font-size: 0.875em;
}

.ql-editor :deep(code) {
  background-color: #f3f4f6;
  padding: 0.125em 0.375em;
  border-radius: 0.25em;
  font-family: ui-monospace, monospace;
  font-size: 0.875em;
}

.ql-editor :deep(hr) {
  border: none;
  border-top: 1px solid #e5e7eb;
  margin: 1.5em 0;
}
</style>
