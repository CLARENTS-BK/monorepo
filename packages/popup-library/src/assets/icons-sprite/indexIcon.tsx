const indexIcon: { [key: string]: JSX.Element } = {
  chevronLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <mask
        id="mask0_3295_15814"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect
          width="40"
          height="40"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_3295_15814)">
        <path
          d="M23.3332 28.8461L14.4871 20L23.3332 11.1538L24.5127 12.3333L16.8461 20L24.5127 27.6666L23.3332 28.8461Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  chevronRight: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <mask
        id="mask0_3295_15860"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect
          width="40"
          height="40"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_3295_15860)">
        <path
          d="M22.1537 20L14.4871 12.3333L15.6666 11.1538L24.5127 20L15.6666 28.8461L14.4871 27.6666L22.1537 20Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  chevronTop: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <mask
        id="mask0_333_83"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect
          width="40"
          height="40"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_333_83)">
        <path
          d="M12.3333 24.5032L11.1538 23.3237L20 14.4775L28.8461 23.3237L27.6666 24.5032L20 16.8365L12.3333 24.5032Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  chevronDown: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <mask
        id="mask0_904_779"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect
          width="40"
          height="40"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_904_779)">
        <path
          d="M20 24.5032L11.1538 15.657L12.3333 14.4775L20 22.1346L27.6666 14.4775L28.8461 15.657L20 24.5032Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  closeUnframed: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <mask
        id="mask0_1244_4956"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect
          width="40"
          height="40"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_1244_4956)">
        <path
          d="M10.6666 30.513L9.48706 29.3335L18.8204 20.0001L9.48706 10.6668L10.6666 9.4873L19.9999 18.8206L29.3332 9.4873L30.5127 10.6668L21.1794 20.0001L30.5127 29.3335L29.3332 30.513L19.9999 21.1796L10.6666 30.513Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
  cloudDownload: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <mask
        id="mask0_3940_279"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="40"
        height="40"
      >
        <rect
          width="40"
          height="40"
          fill="currentColor"
        />
      </mask>
      <g mask="url(#mask0_3940_279)">
        <path
          d="M10.8333 31.6664C8.75416 31.6664 6.98444 30.941 5.52416 29.4901C4.06361 28.0393 3.33333 26.2743 3.33333 24.1951C3.33333 22.2849 3.98611 20.5894 5.29166 19.1089C6.59722 17.628 8.22013 16.833 10.1604 16.7239C10.4401 14.66 11.4764 12.7626 13.2692 11.0318C15.0619 9.30096 17.0278 8.43555 19.1667 8.43555C19.6133 8.43555 20.0028 8.60166 20.335 8.93388C20.6672 9.2661 20.8333 9.65555 20.8333 10.1022V22.2368L24.2692 18.8201L25.4487 19.9997L20 25.4485L14.5512 19.9997L15.7308 18.8201L19.1667 22.2368V10.1022C17.0769 10.1919 15.3044 11.1005 13.8492 12.828C12.3942 14.5558 11.6667 16.3908 11.6667 18.333H10.8333C9.22222 18.333 7.84722 18.9025 6.70833 20.0414C5.56944 21.1803 4.99999 22.5553 4.99999 24.1664C4.99999 25.7775 5.56944 27.1525 6.70833 28.2914C7.84722 29.4303 9.22222 29.9997 10.8333 29.9997H30.8333C32 29.9997 32.9861 29.5969 33.7917 28.7914C34.5972 27.9858 35 26.9997 35 25.833C35 24.6664 34.5972 23.6803 33.7917 22.8747C32.9861 22.0692 32 21.6664 30.8333 21.6664H28.3333V18.333C28.3333 16.9569 28.0278 15.6925 27.4167 14.5397C26.8055 13.3869 26 12.4292 25 11.6664V9.68221C26.5642 10.5478 27.7885 11.7557 28.6729 13.306C29.5576 14.856 30 16.5317 30 18.333V19.9997H31.0258C32.6219 20.0511 33.9611 20.6371 35.0433 21.7576C36.1255 22.8785 36.6667 24.2369 36.6667 25.833C36.6667 27.4678 36.1031 28.8486 34.9758 29.9755C33.8489 31.1028 32.4681 31.6664 30.8333 31.6664H10.8333Z"
          fill="currentColor"
        />
      </g>
    </svg>
  ),
};

export default indexIcon;