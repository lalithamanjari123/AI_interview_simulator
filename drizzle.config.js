/** @type{ import("drizzle-kit").Config} */
export default{
    schema:"./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://ai-interview-mocker_owner:kY03gfpzUBNt@ep-damp-tooth-a5fjoy6s.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
      }
}