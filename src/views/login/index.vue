<template>
  <div class="login-container">
    <div class="login-form">
      <div class="login-left">
        <Delete style="width: 1em; height: 1em; margin-right: 8px" />
      </div>
      <div class="login-right">
        <el-form ref="ruleFormRef" :model="form.user" :rules="form.rules" auto-complete="on" label-position="left">
          <div class="title-container">
            <!-- <img src="~@/assets/images/login-logo.png" class="title-logo" /> -->
            <h3 class="title">{{ $t('login.title') }}</h3>
          </div>
          <el-form-item prop="ss">
            <el-input v-model="input" placeholder="Please input">
            <template #prepend>Http://</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              ref="username"
              v-model="form.user.username"
              :placeholder="$t('login.username')"
              name="username"
              type="text"
              tabindex="1"
              auto-complete="on"
              size="lg"
            >
              <template #prefix>
                <span class="svg-container">
                  <svg-icon name="user" />
                </span>
              </template>
              <!-- <span slot="prefix" class="svg-container"> <svg-icon name="user" /> </span> -->
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="form.user.password"
              :type="passwordType"
              :placeholder="$t('login.password')"
              name="password"
              tabindex="2"
              auto-complete="on"
              size="lg"
              @keyup.native="checkCapslock"
              @keyup.enter.native="handleLogin(ruleFormRef)"
            >
              <template #prefix>
                <span class="svg-container">
                  <svg-icon name="password" />
                </span>
              </template>
              <template #suffix>
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :name="passwordType === 'password' ? 'eye-off' : 'eye-on'" />
                </span>
              </template>
            </el-input>
          </el-form-item>
          <el-button :loading="loading" type="primary" style="width: 100%" size="lg" @click.native.prevent="handleLogin(ruleFormRef)">
            登录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, onMounted, reactive, nextTick } from 'vue'

import type { ElForm } from 'element-plus'
import { useRoute, useRouter } from "vue-router"
import { useStore } from "@/stores/modules/user"
// import { UserModule } from '@/store/modules/user'
type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance>()
const router = useRouter();
const route = useRoute();
const user = useStore()
const loading = ref<Boolean>(false)
const capsTooltip = ref<Boolean>(false)
const passwordType = ref<string>('password')
const input = ref<string>('password')
const showDialog = ref<Boolean>(false)
const form = reactive({
  user: {
    username: 'admin',
    password: '123456'
  },
  rules: {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  }
})
onBeforeMount(() => {
})
onMounted(() => {
  nextTick(() => {
  })
})
const handleLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async(valid) => {
    if (valid) {
      await user.login(form.user)
      console.log('成功')
      router.push('/')
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const passwordref = ref<HTMLElement | null>(null)
const showPwd = () => {
  console.log('passwordType.value', passwordType.value)
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
}
const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  capsTooltip.value = key !== null && key.length === 1 && (key >= 'A' && key <= 'Z')
}
</script>
<style lang="scss">
// References: https://www.zhangxinxu.com/wordpress/2018/01/css-caret-color-first-line/
@supports (-webkit-mask: none) and (not (cater-color: $loginCursorColor)) {
  .login-container .el-input {
    input { color: $loginCursorColor; }
    input::first-line { color: $lightGray; }
  }
}

.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    input {
      height: 47px;
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 50px;
      color: $lightGray;
      caret-color: $loginCursorColor;
      -webkit-appearance: none;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $loginBg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
.login-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-color: $loginBg;
  .el-dialog__body {
    max-height: 500px;
    overflow-y: scroll;
  }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $darkGray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
@import './index.scss';
</style>

