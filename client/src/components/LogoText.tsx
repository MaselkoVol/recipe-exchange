import React from "react";

type Props = {};

const LogoText = (attrs: React.SVGAttributes<HTMLOrSVGElement>) => {
  return (
    <svg {...attrs} fill="black" width={200} viewBox="0 0 56 13" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="Gradient2" x1="1" x2="0" y1="1" y2="0">
          <stop offset="0%" stopColor="#6b00af" />
          <stop offset="100%" stopColor="#9c00ff" />
        </linearGradient>
      </defs>
      <path
        fill="url(#Gradient2)"
        d="M3.372 9.156C2.804 9.156 2.304 9.028 1.872 8.772C1.448 8.516 1.12 8.152 0.888 7.68C0.656 7.208 0.54 6.648 0.54 6C0.54 5.384 0.64 4.792 0.84 4.224C1.04 3.656 1.328 3.148 1.704 2.7C2.08 2.252 2.532 1.896 3.06 1.632C3.588 1.368 4.184 1.236 4.848 1.236C5.344 1.236 5.752 1.312 6.072 1.464C6.392 1.616 6.552 1.84 6.552 2.136C6.552 2.28 6.512 2.424 6.432 2.568C6.36 2.704 6.264 2.82 6.144 2.916C6.024 3.012 5.9 3.06 5.772 3.06C5.692 3.06 5.628 3.04 5.58 3C5.364 2.856 5.152 2.752 4.944 2.688C4.736 2.616 4.496 2.58 4.224 2.58C3.656 2.58 3.176 2.712 2.784 2.976C2.392 3.232 2.092 3.572 1.884 3.996C1.684 4.42 1.584 4.88 1.584 5.376C1.584 5.856 1.676 6.28 1.86 6.648C2.044 7.016 2.3 7.304 2.628 7.512C2.956 7.72 3.34 7.824 3.78 7.824C4.132 7.824 4.472 7.756 4.8 7.62C5.136 7.476 5.432 7.28 5.688 7.032C5.8 6.928 5.912 6.876 6.024 6.876C6.12 6.876 6.188 6.916 6.228 6.996C6.268 7.076 6.288 7.156 6.288 7.236C6.288 7.372 6.248 7.528 6.168 7.704C6.088 7.872 5.964 8.04 5.796 8.208C5.5 8.504 5.136 8.736 4.704 8.904C4.272 9.072 3.828 9.156 3.372 9.156ZM8.93794 9.156C8.38594 9.156 7.94194 9.008 7.60594 8.712C7.27794 8.408 7.11394 7.964 7.11394 7.38C7.11394 7.108 7.14994 6.844 7.22194 6.588C7.30194 6.332 7.40594 6.092 7.53394 5.868C7.40594 5.948 7.30994 5.988 7.24594 5.988C7.14994 5.988 7.08194 5.936 7.04194 5.832C7.00994 5.72 6.99394 5.612 6.99394 5.508C6.99394 5.324 7.02994 5.18 7.10194 5.076C7.18194 4.964 7.25794 4.88 7.32994 4.824C7.49794 4.68 7.76194 4.524 8.12194 4.356C8.48194 4.18 8.91394 4.092 9.41794 4.092C10.1059 4.092 10.6379 4.284 11.0139 4.668C11.3979 5.052 11.5899 5.588 11.5899 6.276C11.5899 6.812 11.4779 7.3 11.2539 7.74C11.0299 8.172 10.7179 8.516 10.3179 8.772C9.92594 9.028 9.46594 9.156 8.93794 9.156ZM9.30994 7.932C9.70994 7.932 10.0459 7.808 10.3179 7.56C10.5979 7.304 10.7379 6.968 10.7379 6.552C10.7379 6.12 10.5979 5.812 10.3179 5.628C10.0379 5.444 9.71394 5.352 9.34594 5.352C9.17794 5.352 9.02594 5.368 8.88994 5.4C8.75394 5.432 8.62594 5.472 8.50594 5.52C8.39394 5.68 8.29394 5.86 8.20594 6.06C8.11794 6.26 8.07394 6.48 8.07394 6.72C8.07394 7.12 8.19394 7.424 8.43394 7.632C8.67394 7.832 8.96594 7.932 9.30994 7.932ZM14.4106 9.156C13.8586 9.156 13.4146 9.008 13.0786 8.712C12.7506 8.408 12.5866 7.964 12.5866 7.38C12.5866 7.108 12.6226 6.844 12.6946 6.588C12.7746 6.332 12.8786 6.092 13.0066 5.868C12.8786 5.948 12.7826 5.988 12.7186 5.988C12.6226 5.988 12.5546 5.936 12.5146 5.832C12.4826 5.72 12.4666 5.612 12.4666 5.508C12.4666 5.324 12.5026 5.18 12.5746 5.076C12.6546 4.964 12.7306 4.88 12.8026 4.824C12.9706 4.68 13.2346 4.524 13.5946 4.356C13.9546 4.18 14.3866 4.092 14.8906 4.092C15.5786 4.092 16.1106 4.284 16.4866 4.668C16.8706 5.052 17.0626 5.588 17.0626 6.276C17.0626 6.812 16.9506 7.3 16.7266 7.74C16.5026 8.172 16.1906 8.516 15.7906 8.772C15.3986 9.028 14.9386 9.156 14.4106 9.156ZM14.7826 7.932C15.1826 7.932 15.5186 7.808 15.7906 7.56C16.0706 7.304 16.2106 6.968 16.2106 6.552C16.2106 6.12 16.0706 5.812 15.7906 5.628C15.5106 5.444 15.1866 5.352 14.8186 5.352C14.6506 5.352 14.4986 5.368 14.3626 5.4C14.2266 5.432 14.0986 5.472 13.9786 5.52C13.8666 5.68 13.7666 5.86 13.6786 6.06C13.5906 6.26 13.5466 6.48 13.5466 6.72C13.5466 7.12 13.6666 7.424 13.9066 7.632C14.1466 7.832 14.4386 7.932 14.7826 7.932ZM18.4433 9.132C18.3553 9.132 18.2713 9.104 18.1913 9.048C18.1113 9 18.0793 8.932 18.0953 8.844C18.2153 8.204 18.3153 7.556 18.3953 6.9C18.4833 6.236 18.5273 5.568 18.5273 4.896C18.5273 4.304 18.5073 3.768 18.4673 3.288C18.4273 2.808 18.2993 2.348 18.0833 1.908C18.0433 1.82 18.0113 1.744 17.9873 1.68C17.9633 1.616 17.9513 1.556 17.9513 1.5C17.9513 1.348 18.0393 1.2 18.2153 1.056C18.3913 0.912 18.5793 0.84 18.7793 0.84C19.0673 0.84 19.2633 1.016 19.3673 1.368C19.4713 1.72 19.5233 2.24 19.5233 2.928C19.5233 3.752 19.4753 4.472 19.3793 5.088C19.2833 5.696 19.1993 6.16 19.1273 6.48L19.1753 6.504C19.3353 6.112 19.5393 5.736 19.7873 5.376C20.0353 5.008 20.3193 4.704 20.6393 4.464C20.9673 4.224 21.3233 4.104 21.7073 4.104C22.0833 4.104 22.3713 4.216 22.5713 4.44C22.7793 4.664 22.8833 4.932 22.8833 5.244C22.8833 5.612 22.7513 5.94 22.4873 6.228C22.2233 6.516 21.8793 6.756 21.4553 6.948C21.5593 7.22 21.7073 7.436 21.8993 7.596C22.0913 7.748 22.3353 7.824 22.6313 7.824C22.7273 7.824 22.8073 7.816 22.8713 7.8C22.9753 7.776 23.0273 7.876 23.0273 8.1C23.0273 8.228 23.0033 8.372 22.9553 8.532C22.9073 8.692 22.8113 8.832 22.6673 8.952C22.5313 9.064 22.3233 9.12 22.0433 9.12C21.6673 9.12 21.3593 9.012 21.1193 8.796C20.8873 8.572 20.7033 8.3 20.5673 7.98C20.4393 7.652 20.3393 7.328 20.2673 7.008C20.2033 6.712 20.3033 6.556 20.5673 6.54C20.8473 6.508 21.0833 6.424 21.2753 6.288C21.4673 6.152 21.5633 5.972 21.5633 5.748C21.5633 5.492 21.4393 5.364 21.1913 5.364C21.0313 5.364 20.8673 5.424 20.6992 5.544C20.5393 5.656 20.3873 5.792 20.2433 5.952C20.1073 6.112 19.9953 6.268 19.9073 6.42C19.7873 6.628 19.6833 6.832 19.5953 7.032C19.5073 7.232 19.4353 7.432 19.3793 7.632V8.112C19.3793 8.408 19.2913 8.652 19.1152 8.844C18.9473 9.036 18.7233 9.132 18.4433 9.132ZM24.9953 3.036C24.7713 3.028 24.5913 2.96 24.4553 2.832C24.3193 2.704 24.2513 2.524 24.2513 2.292C24.2593 2.044 24.3433 1.844 24.5033 1.692C24.6633 1.532 24.8673 1.456 25.1152 1.464C25.3473 1.472 25.5273 1.54 25.6553 1.668C25.7913 1.796 25.8553 1.976 25.8473 2.208C25.8393 2.448 25.7593 2.648 25.6073 2.808C25.4553 2.96 25.2513 3.036 24.9953 3.036ZM25.0073 9.12C24.7673 9.12 24.5793 9.056 24.4433 8.928C24.3073 8.792 24.2393 8.564 24.2393 8.244C24.2393 8.06 24.2553 7.88 24.2873 7.704C24.3273 7.528 24.3713 7.356 24.4193 7.188C24.4753 7.012 24.5193 6.832 24.5513 6.648C24.5913 6.464 24.6113 6.268 24.6113 6.06C24.6113 5.916 24.5913 5.78 24.5513 5.652C24.5113 5.516 24.4233 5.416 24.2873 5.352C24.1833 5.296 24.0913 5.24 24.0113 5.184C23.9393 5.12 23.9033 5.04 23.9033 4.944C23.9033 4.832 23.9553 4.712 24.0593 4.584C24.1633 4.456 24.2993 4.348 24.4673 4.26C24.6433 4.164 24.8233 4.116 25.0073 4.116C25.2073 4.116 25.3513 4.168 25.4393 4.272C25.5353 4.376 25.5993 4.508 25.6313 4.668C25.6633 4.828 25.6793 4.992 25.6793 5.16C25.6793 5.416 25.6593 5.668 25.6193 5.916C25.5793 6.156 25.5393 6.38 25.4993 6.588C25.4673 6.74 25.4433 6.88 25.4273 7.008C25.4113 7.136 25.4033 7.256 25.4033 7.368C25.4033 7.568 25.4513 7.72 25.5473 7.824C25.6433 7.92 25.7793 8.012 25.9553 8.1C26.0273 8.14 26.0633 8.2 26.0633 8.28C26.0633 8.344 26.0313 8.444 25.9673 8.58C25.9033 8.716 25.7913 8.84 25.6313 8.952C25.4793 9.064 25.2713 9.12 25.0073 9.12ZM27.6358 9.132C27.3478 9.132 27.2198 9.036 27.2518 8.844C27.3398 8.5 27.4118 8.152 27.4678 7.8C27.5318 7.44 27.5638 7.096 27.5638 6.768C27.5638 6.344 27.5358 6.036 27.4798 5.844C27.4318 5.644 27.3638 5.508 27.2758 5.436C27.1878 5.356 27.0798 5.296 26.9518 5.256C26.8958 5.232 26.8438 5.2 26.7958 5.16C26.7558 5.12 26.7358 5.064 26.7358 4.992C26.7358 4.88 26.7798 4.756 26.8678 4.62C26.9558 4.484 27.0798 4.368 27.2398 4.272C27.4078 4.168 27.5958 4.116 27.8038 4.116C28.0758 4.116 28.2638 4.212 28.3678 4.404C28.4718 4.588 28.5238 4.832 28.5238 5.136C28.5238 5.336 28.5038 5.56 28.4638 5.808C28.4238 6.056 28.3838 6.28 28.3438 6.48L28.3798 6.492C28.5398 6.068 28.7318 5.676 28.9558 5.316C29.1878 4.948 29.4558 4.652 29.7598 4.428C30.0638 4.204 30.4158 4.092 30.8158 4.092C31.2398 4.092 31.5638 4.22 31.7878 4.476C32.0118 4.732 32.1238 5.052 32.1238 5.436C32.1238 5.596 32.1038 5.748 32.0638 5.892C32.0318 6.036 31.9958 6.176 31.9558 6.312C31.9158 6.44 31.8798 6.572 31.8478 6.708C31.8238 6.844 31.8118 6.98 31.8118 7.116C31.8118 7.572 32.0278 7.88 32.4598 8.04C32.5718 8.088 32.6278 8.16 32.6278 8.256C32.6278 8.328 32.6038 8.432 32.5558 8.568C32.5078 8.704 32.4198 8.832 32.2918 8.952C32.1638 9.064 31.9758 9.12 31.7278 9.12C31.4078 9.12 31.1598 9.008 30.9838 8.784C30.8078 8.552 30.7198 8.26 30.7198 7.908C30.7198 7.708 30.7398 7.508 30.7798 7.308C30.8278 7.1 30.8758 6.908 30.9238 6.732C30.9558 6.596 30.9838 6.464 31.0078 6.336C31.0398 6.2 31.0558 6.08 31.0558 5.976C31.0558 5.608 30.8638 5.424 30.4798 5.424C30.1518 5.424 29.8638 5.548 29.6158 5.796C29.3678 6.036 29.1558 6.34 28.9798 6.708C28.8038 7.076 28.6598 7.448 28.5478 7.824V8.112C28.5478 8.408 28.4638 8.652 28.2958 8.844C28.1358 9.036 27.9158 9.132 27.6358 9.132ZM34.9574 12.312C34.3574 12.312 33.8814 12.188 33.5294 11.94C33.1774 11.692 33.0014 11.372 33.0014 10.98C33.0014 10.692 33.0894 10.436 33.2654 10.212C33.4494 9.988 33.6894 9.876 33.9854 9.876C34.1534 9.876 34.2374 9.924 34.2374 10.02C34.2374 10.076 34.2254 10.14 34.2014 10.212C34.1854 10.284 34.1774 10.356 34.1774 10.428C34.1774 10.652 34.3054 10.816 34.5614 10.92C34.8174 11.032 35.1254 11.088 35.4854 11.088C35.7094 11.088 35.9374 11.064 36.1694 11.016C36.4014 10.968 36.5934 10.892 36.7454 10.788C36.9054 10.692 36.9854 10.56 36.9854 10.392C36.9854 10.208 36.8934 10.072 36.7094 9.984C36.5254 9.896 36.2934 9.828 36.0134 9.78C35.7334 9.74 35.4454 9.7 35.1494 9.66C34.8614 9.628 34.6134 9.572 34.4054 9.492C34.1414 9.404 33.9454 9.296 33.8174 9.168C33.6894 9.04 33.6254 8.876 33.6254 8.676C33.6254 8.3 33.8534 8 34.3094 7.776C34.0454 7.64 33.8454 7.448 33.7094 7.2C33.5814 6.952 33.5174 6.676 33.5174 6.372C33.5174 5.98 33.6174 5.612 33.8174 5.268C34.0254 4.924 34.3294 4.644 34.7294 4.428C35.1374 4.204 35.6454 4.092 36.2534 4.092C36.5254 4.092 36.8014 4.12 37.0814 4.176C37.3614 4.224 37.5934 4.32 37.7774 4.464C37.9694 4.6 38.0654 4.8 38.0654 5.064C38.0654 5.16 38.0454 5.268 38.0054 5.388C37.9654 5.5 37.8894 5.556 37.7774 5.556C37.7294 5.556 37.6654 5.548 37.5854 5.532C37.5054 5.508 37.4334 5.488 37.3694 5.472C37.3854 5.552 37.3974 5.64 37.4054 5.736C37.4214 5.832 37.4294 5.932 37.4294 6.036C37.4294 6.508 37.2694 6.936 36.9494 7.32C36.6294 7.696 36.1614 7.92 35.5454 7.992C35.3214 8.008 35.1534 8.036 35.0414 8.076C34.9374 8.108 34.8854 8.168 34.8854 8.256C34.8854 8.336 34.9334 8.396 35.0294 8.436C35.1254 8.468 35.2494 8.492 35.4014 8.508C35.8894 8.548 36.3214 8.616 36.6974 8.712C37.0734 8.808 37.3654 8.96 37.5734 9.168C37.7894 9.384 37.8974 9.688 37.8974 10.08C37.8974 10.536 37.7614 10.928 37.4894 11.256C37.2254 11.592 36.8694 11.852 36.4214 12.036C35.9734 12.22 35.4854 12.312 34.9574 12.312ZM35.4134 6.948C35.7814 6.948 36.0694 6.848 36.2774 6.648C36.4854 6.448 36.5894 6.188 36.5894 5.868C36.5894 5.78 36.5814 5.692 36.5654 5.604C36.5494 5.508 36.5334 5.428 36.5174 5.364C36.3894 5.324 36.2654 5.3 36.1454 5.292C36.0254 5.276 35.9094 5.268 35.7974 5.268C35.3734 5.268 35.0414 5.348 34.8014 5.508C34.5614 5.668 34.4414 5.888 34.4414 6.168C34.4414 6.416 34.5294 6.608 34.7054 6.744C34.8814 6.88 35.1174 6.948 35.4134 6.948ZM42.8635 9.12C42.7675 9.12 42.6675 9.104 42.5635 9.072C42.4675 9.04 42.3875 8.964 42.3235 8.844C42.2595 8.724 42.2275 8.54 42.2275 8.292C42.2275 8.092 42.2435 7.84 42.2755 7.536C42.3155 7.224 42.3635 6.892 42.4195 6.54C42.4755 6.18 42.5195 5.8 42.5515 5.4C42.5915 5 42.6115 4.596 42.6115 4.188C42.6115 4.028 42.6075 3.856 42.5995 3.672C42.5915 3.488 42.5755 3.308 42.5515 3.132C42.4955 3.164 42.4395 3.192 42.3835 3.216C42.3355 3.232 42.2875 3.24 42.2395 3.24C42.1035 3.24 42.0355 3.108 42.0355 2.844C42.0355 2.604 42.0875 2.404 42.1915 2.244C42.3035 2.076 42.5035 1.916 42.7915 1.764C43.0715 1.612 43.3995 1.488 43.7755 1.392C44.1595 1.288 44.5475 1.236 44.9395 1.236C45.7155 1.236 46.3355 1.44 46.7995 1.848C47.2715 2.256 47.5075 2.8 47.5075 3.48C47.5075 3.896 47.4235 4.28 47.2555 4.632C47.0875 4.984 46.8635 5.292 46.5835 5.556C46.3115 5.812 46.0115 6.012 45.6835 6.156C45.3635 6.292 45.0475 6.36 44.7355 6.36C44.4395 6.36 44.2395 6.296 44.1355 6.168C44.0315 6.032 43.9795 5.84 43.9795 5.592C43.9795 5.472 43.9915 5.364 44.0155 5.268C44.0475 5.164 44.1115 5.112 44.2075 5.112C44.2315 5.112 44.2675 5.116 44.3155 5.124C44.3635 5.132 44.4115 5.144 44.4595 5.16C44.5075 5.168 44.5755 5.18 44.6635 5.196C44.7515 5.212 44.8515 5.22 44.9635 5.22C45.4035 5.22 45.7595 5.096 46.0315 4.848C46.3115 4.6 46.4515 4.28 46.4515 3.888C46.4515 3.48 46.2995 3.16 45.9955 2.928C45.6915 2.696 45.2995 2.58 44.8195 2.58C44.6435 2.58 44.4635 2.596 44.2795 2.628C44.0955 2.652 43.9115 2.688 43.7275 2.736C43.7035 3.264 43.6475 3.864 43.5595 4.536C43.5115 4.936 43.4675 5.332 43.4275 5.724C43.3955 6.108 43.3795 6.46 43.3795 6.78C43.3795 7.06 43.4035 7.308 43.4515 7.524C43.5075 7.732 43.6155 7.912 43.7755 8.064C43.8875 8.176 43.9435 8.296 43.9435 8.424C43.9435 8.6 43.8435 8.76 43.6435 8.904C43.4435 9.048 43.1835 9.12 42.8635 9.12ZM49.1828 3.036C48.9588 3.028 48.7788 2.96 48.6428 2.832C48.5068 2.704 48.4388 2.524 48.4388 2.292C48.4468 2.044 48.5308 1.844 48.6908 1.692C48.8508 1.532 49.0548 1.456 49.3027 1.464C49.5348 1.472 49.7148 1.54 49.8428 1.668C49.9788 1.796 50.0428 1.976 50.0348 2.208C50.0268 2.448 49.9468 2.648 49.7948 2.808C49.6428 2.96 49.4388 3.036 49.1828 3.036ZM49.1948 9.12C48.9548 9.12 48.7668 9.056 48.6308 8.928C48.4948 8.792 48.4268 8.564 48.4268 8.244C48.4268 8.06 48.4428 7.88 48.4748 7.704C48.5148 7.528 48.5588 7.356 48.6068 7.188C48.6628 7.012 48.7068 6.832 48.7388 6.648C48.7788 6.464 48.7988 6.268 48.7988 6.06C48.7988 5.916 48.7788 5.78 48.7388 5.652C48.6988 5.516 48.6108 5.416 48.4748 5.352C48.3708 5.296 48.2788 5.24 48.1988 5.184C48.1268 5.12 48.0908 5.04 48.0908 4.944C48.0908 4.832 48.1428 4.712 48.2468 4.584C48.3508 4.456 48.4868 4.348 48.6548 4.26C48.8308 4.164 49.0108 4.116 49.1948 4.116C49.3948 4.116 49.5388 4.168 49.6268 4.272C49.7228 4.376 49.7868 4.508 49.8188 4.668C49.8508 4.828 49.8668 4.992 49.8668 5.16C49.8668 5.416 49.8468 5.668 49.8068 5.916C49.7668 6.156 49.7268 6.38 49.6868 6.588C49.6548 6.74 49.6308 6.88 49.6148 7.008C49.5988 7.136 49.5908 7.256 49.5908 7.368C49.5908 7.568 49.6388 7.72 49.7348 7.824C49.8308 7.92 49.9668 8.012 50.1428 8.1C50.2148 8.14 50.2508 8.2 50.2508 8.28C50.2508 8.344 50.2188 8.444 50.1548 8.58C50.0908 8.716 49.9788 8.84 49.8188 8.952C49.6668 9.064 49.4588 9.12 49.1948 9.12ZM53.0353 9.156C52.4273 9.156 51.9513 8.984 51.6073 8.64C51.2713 8.288 51.1033 7.8 51.1033 7.176C51.1033 6.608 51.2273 6.092 51.4753 5.628C51.7233 5.164 52.0553 4.796 52.4713 4.524C52.8953 4.244 53.3593 4.104 53.8633 4.104C54.3433 4.104 54.7273 4.224 55.0153 4.464C55.3033 4.696 55.4473 5.008 55.4473 5.4C55.4473 5.712 55.3513 6 55.1593 6.264C54.9673 6.528 54.7113 6.74 54.3913 6.9C54.0713 7.052 53.7153 7.128 53.3233 7.128C52.8433 7.128 52.4513 7.02 52.1473 6.804C52.1553 7.172 52.2793 7.468 52.5193 7.692C52.7673 7.916 53.0833 8.028 53.4673 8.028C53.6993 8.028 53.9353 7.988 54.1753 7.908C54.4233 7.82 54.6353 7.704 54.8113 7.56C54.9233 7.464 55.0273 7.416 55.1233 7.416C55.2033 7.416 55.2673 7.444 55.3153 7.5C55.3713 7.548 55.3993 7.612 55.3993 7.692C55.3993 7.868 55.2473 8.1 54.9433 8.388C54.4073 8.9 53.7713 9.156 53.0353 9.156ZM53.2153 6.336C53.5033 6.336 53.7433 6.276 53.9353 6.156C54.1273 6.036 54.2233 5.884 54.2233 5.7C54.2233 5.548 54.1593 5.432 54.0313 5.352C53.9033 5.264 53.7273 5.22 53.5033 5.22C53.2073 5.22 52.9473 5.3 52.7233 5.46C52.5073 5.612 52.3513 5.828 52.2553 6.108C52.3673 6.18 52.5113 6.236 52.6873 6.276C52.8633 6.316 53.0393 6.336 53.2153 6.336Z"
      />
    </svg>
  );
};

export default LogoText;
