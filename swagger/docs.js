/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication endpoints
 *   - name: Instructors
 *     description: Instructor management endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               -first_name
 *               -last_name
 *               - email
 *               - password_hash
 *               - town
 *               - city
 *               - state
 *               - zip_code
 *               - country
 *               - phone
 *       
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John 
 *               last_name:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password_hash:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *               town:
 *                 type: string
 *                 example: New York
 *               city:
 *                 type: string
 *                 example: New York
 *               state:
 *                 type: string
 *                 example: New York
 *               zip_code:
 *                 type: string
 *                 example: 12345
 *               country:
 *                 type: string
 *                 example: USA
 *               phone:
 *                 type: string
 *                 example: 1234567890  
 *               dob:
 *                 type: string
 *                 example: 1990-01-01
 * 
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       400:
 *         description: Bad request - validation error
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: StrongPass123!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     email:
 *                       type: string
 *                     name:
 *                       type: string
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /instructor:
 *   get:
 *     summary: Get all instructors with pagination
 *     tags: [Instructors]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of instructors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                       email:
 *                         type: string
 *                         example: john@example.com
 *                       specialization:
 *                         type: string
 *                         example: Yoga
 *                       bio:
 *                         type: string
 *                         example: Certified yoga instructor with 10 years experience
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total_items:
 *                       type: integer
 *                       example: 50
 *                     current_page:
 *                       type: integer
 *                       example: 1
 *                     per_page:
 *                       type: integer
 *                       example: 10
 *                     total_pages:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to fetch instructors
 *                 error:
 *                   type: string
 *                   example: Database connection failed
 */
  
  /** 
   * @swagger
   * /testimonials:
   *   get:
   *     summary: Get all testimonials
   *     tags: [Testimonials]
   *     responses:
   *       200:
   *         description: Testimonials retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       name:
   *                         type: string       
   *                         example: John Doe
   *                       email:
   *                         type: string
   *                         example: user@example.com
   *                       message:
   *                         type: string
   *                         example: Great service!
   *                       createdAt:
   *                         type: string
   *                         format: date-time  
   *                       updatedAt:
   *                         type: string
   *                         format: date-time  
   *       500:
   *         description: Server error
   *         content:
   *           application/json:
   *             schema:
   *               type: object 
   *               properties:
   *                 message:
   *                   type: string 
   *                   example: Failed to fetch testimonials
   *                 error:
   *                   type: string 
   *                   example: Database connection failed  
   *    
   *
  */
 /**
 * @swagger
 * /upcoming-training:
 *   get:
 *     summary: Get last 3 upcoming training sessions
 *     description: Returns the most recent scheduled class sessions along with instructor and studio details.
 *     tags:
 *       - Training
 *     responses:
 *       200:
 *         description: Successfully retrieved upcoming training sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 6
 *                       class_type_id:
 *                         type: integer
 *                         example: 8
 *                       instructor_id:
 *                         type: integer
 *                         example: 10
 *                       studio_id:
 *                         type: integer
 *                         example: 7
 *                       capacity:
 *                         type: integer
 *                         example: 800
 *                       duration_minutes:
 *                         type: integer
 *                         example: 60
 *                       start_time:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-04T10:08:00.000Z"
 *                       end_time:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-12-04T11:08:00.000Z"
 *                       booked_count:
 *                         type: integer
 *                         example: 0
 *                       price:
 *                         type: string
 *                         example: "600.00"
 *                       status:
 *                         type: string
 *                         example: "scheduled"
 *                       Instructor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 10
 *                           first_name:
 *                             type: string
 *                             example: "Rohan"
 *                           last_name:
 *                             type: string
 *                             example: "Patel"
 *                           experience_years:
 *                             type: integer
 *                             example: 12
 *                           specialization:
 *                             type: string
 *                             example: "Endurance Training"
 *                           image:
 *                             type: string
 *                             example: "instructor-1762843616021-116384603.jpg"
 *                           status:
 *                             type: string
 *                             example: "active"
 *                       Studio:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 7
 *                           name:
 *                             type: string
 *                             example: "Rhythm Ride Studio - San Francisco"
 *                           address:
 *                             type: string
 *                             example: "201 Market St, San Francisco"
 *                           city:
 *                             type: string
 *                             example: "San Francisco"
 *                           state:
 *                             type: string
 *                             example: "California"
 *                           country:
 *                             type: string
 *                             example: "USA"
 *       500:
 *         description: Internal server error
 */

  /** 
   * @swagger
   * /services:
   *   get:
   *     summary: Get all services
   *     tags: [Services]
   *     responses:
   *       200:
   *         description: List of services retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: true
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   *                     properties: 
   *                       id:
   *                         type: integer
   *                         example: 1
   *                       name:
   *                         type: string
   *                         example: "Yoga"
   *                       description:
   *                         type: string
   *                         example: "Yoga is a physical exercise that helps to improve flexibility, strength, and balance."
   *                       image:
   *                         type: string
   *                         example: "yoga.jpg"
   *       500: 
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:     
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: Failed to fetch services
   *                 error:
   *                   type: string  
   *                   example: Internal server error
   */     
  
 /**
 * @swagger
 * /short-videos:
 *   get:
 *     summary: Get all short videos
 *     tags: [Short Videos]
 *     parameters:
 *       - in: query
 *         name: service_id
 *         required: false
 *         schema:
 *           type: integer
 *         description: Filter short videos by service ID
 *     responses:
 *       200:
 *         description: List of short videos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Short videos fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       service_id:
 *                         type: integer
 *                         example: 2
 *                       status:
 *                         type: string
 *                         example: active
 *                       video:
 *                         type: string
 *                         example: https://example.com/stream/short-video/video.mp4
 *                       thumbnail:
 *                         type: string
 *                         example: https://example.com/uploads/thumb.jpg
 *                       classType:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           name:
 *                             type: string
 *                             example: Yoga
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error fetching short videos
 *                 errors:
 *                   type: string
 *                   example: Internal server error
 */


