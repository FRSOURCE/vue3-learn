<template>
    <ElForm @submit.prevent label-position="top">
        <ElFormItem>
            <ElInput v-model="userName"/>
        </ElFormItem>
        <ElFormItem>
            <ElButton type="primary" @click="saveUserName" native-type="submit">Save</ElButton>
        </ElFormItem>
    </ElForm>
    {{ store.state.user.userName }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {ElForm, ElFormItem, ElInput, ElButton} from 'element-plus';
import store from '@/store';

export default defineComponent({
    name: 'Game',
    components: {
        ElForm,
        ElFormItem,
        ElInput,
        ElButton,
    },
    setup(){
        const userName = ref('');
        const saveUserName = () => store.commit('setUserName', userName.value);
        return {
            userName,
            saveUserName,
            store,
        }
    }
})
</script>
