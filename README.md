## Contributions

| Member Name | Tasks Completed                                                                   | Contribution (%) |
| ----------- | --------------------------------------------------------------------------------- | ---------------- |
| Casper      | V1 V2 BE and FE deployment and controller fixes                                   | 33%              |
| Tino        | Updated models, refactored tests and controllers                                  | 33%              |
| Phong Le    | Frontend V1 & Frontend V2 & Frontend Authentication and V1 userController adjusts | 33%              |

## Submission Checklist

- [x] API V1 Code (without authentication)
- [x] API V2 Code (with authentication)
- [x] Frontend Code
- [x] Backend tests for API V1
- [x] Backend tests for API V2
- [x] Deployed URLs
- [x] Self-assessment & grading

## Self-assesment

### Casper

Had to use `.equals` comparison check:

```javascript
if (!user_id.equals(job.user_id)) {
  return res.status(403).json({ message: "Not authorized" });
}
```

instead of:

```javascript
if (user_id !== query.user_id.toString()) {
  return res.status(404).json({ message: "Not authorized" });
}
```

for update job controller to work.

### Phong

Call the api to fetch data by using post method, I using try catch to catch up the error which can be return from server

```javascript
  const addJob = async (newJob) => {
    try {
      const res = await fetch("https://coding-marathon-3-be-protected.onrender.com/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) {
        throw new Error("Failed to add job");
      }
      return true;
    } catch (error) {
      console.error("Error adding job:", error);
      return false;
    }
  };

```

- Tino
For user validation to work properly in backend-protected, I added the user ID field to the job schema:
```javascript
user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
},
```
Added if statement so only the user who created the job can update/delete it:
```javascript
if (user_id !== query.user_id.toString()) {
  return res.status(404).json({ message: "Not authorized" });
}
```