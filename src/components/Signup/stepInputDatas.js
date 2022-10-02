const stepInputDatas = [
  [
    {
      id: 1,
      type: "text",
      placeholderText: "Name",
      name: "name",
    },
    {
      id: 2,
      type: "text",
      placeholderText: "Last name",
      name: "lastName",
    },
  ],
  [
    {
      id: 3,
      checkExistence: true,
      togglingInputs: [
        {
          type: "email",
          placeholderText: "Email",
          name: "email",
        },
        { type: "tel", placeholderText: "Number", name: "number" },
      ],
    },
  ],
  [
    {
      id: 4,
      type: "password",
      placeholderText: "Password",
      name: "password",
    },
    {
      id: 5,
      type: "password",
      placeholderText: "Confirm password",
      name: "passwordConfirmation",
    },
  ],
  [{ id: 6 }],
];

export default stepInputDatas;
