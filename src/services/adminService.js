// 🔥 Dummy APIs (simulate backend)

export const registerAdmin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.password !== data.confirmPassword) {
        reject({ message: "Passwords do not match" });
      } else {
        resolve({
          message: "Admin registered successfully",
        });
      }
    }, 1000);
  });
};

export const loginAdmin = (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Dummy validation
      if (data.email === "admin@test.com" && data.password === "1234") {
        resolve({
          token: "dummy-token",
          admin: {
            name: "Admin",
            email: data.email,
          },
        });
      } else {
        reject({ message: "Invalid credentials" });
      }
    }, 1000);
  });
};